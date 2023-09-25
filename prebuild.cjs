// @ts-check

const fs = require('node:fs');
const path = require('node:path');

const prettier = require('prettier');
const R = require('ramda');
const { Project } = require('ts-morph');

const MIN_FILE_PATHNAME = path.join(__dirname, 'src', 'zefyr.min.ts');
const PACKAGEJSON_PATHNAME = path.join(__dirname, 'package.json');

fs.writeFileSync(
  PACKAGEJSON_PATHNAME,
  fs
    .readFileSync(PACKAGEJSON_PATHNAME, 'utf-8')
    .replace('"types": "./index.d.ts"', '"types": "./dist/zefyr.min.d.ts"'),
);

/** @type {Record<string, { type: ReturnType<typeof resolveImport>['symbols']; value: ReturnType<typeof resolveImport>['symbols'] }>} */
let imports = {};
/** @type {Set<string>} */
const symbols = new Set();

/**
 * @param {string} code
 * @param {string} oldName
 * @param {string} newName
 * @returns
 */
const renameImport = (code, oldName, newName = '') => {
  const project = new Project({});
  const sourceFile = project.createSourceFile('temp.ts', code);

  // Get all import declarations
  const importDeclarations = sourceFile.getImportDeclarations();

  // Find import
  /** @type {string} */
  let importPath;
  /** @type {(newName: string) => unknown} */
  let rename;
  for (const importDeclaration of importDeclarations) {
    // Handle default import
    const defaultImport = importDeclaration.getDefaultImport();
    if (defaultImport && defaultImport.getText() === oldName) {
      importPath = importDeclaration.getModuleSpecifierValue();
      rename = (newName) => defaultImport.rename(newName);
      continue;
    }

    // Handle named import
    const namedImports = importDeclaration.getNamedImports();
    for (const namedImport of namedImports) {
      // If there is an alias
      if (
        namedImport.getAliasNode() &&
        namedImport.getAliasNode()?.getText() === oldName
      ) {
        importPath = importDeclaration.getModuleSpecifierValue();
        rename = (newName) => namedImport.renameAlias(newName);
      }
      // If there is no alias
      else if (namedImport.getName() === oldName) {
        importPath = importDeclaration.getModuleSpecifierValue();
        rename = (newName) => namedImport.setAlias(newName);
      }
    }
  }

  // If new name is not provided, generate a new name
  if (newName === '') {
    /**
     * @param {string} str
     * @returns
     */
    const capitalize = (str) =>
      str.length > 0 ? str[0].toUpperCase() + str.slice(1) : str;

    // @ts-expect-error - `importPath` should be assigned
    const module = importPath
      .split('/')
      .findLast((s) => s === 'global' || /^[A-Z]$/.test(s[0]));
    if (module) {
      if (
        oldName.startsWith('is') &&
        oldName.length > 2 &&
        oldName[2] === oldName[2].toUpperCase()
      )
        newName = `is${capitalize(module)}${oldName.slice(2)}`;
      else
        newName =
          (/^[A-Z]$/.test(oldName[0]) ? module[0] : module[0].toLowerCase()) +
          module.slice(1) +
          capitalize(oldName);
    } else {
      newName = oldName;
      if (symbols.has(newName)) {
        let i = 2;
        while (symbols.has(`${newName}${i}`)) i++;
        newName = `${newName}${i}`;
      }
    }
  }

  // Handle object destructuring
  sourceFile.forEachDescendant((node) => {
    if (
      node.getKindName() === 'ShorthandPropertyAssignment' &&
      node.getText() === oldName
    )
      node.replaceWithText(`${oldName}: ${newName}`);
  });

  // @ts-expect-error - `rename` should be assigned
  rename(newName);

  // Return the updated code
  return sourceFile.getFullText();
};

/**
 * @param {{ defaultSymbol: string; nonDefaultSymbols: (string | [string, string])[]; type: 'value' | 'type'; path: string }} options
 */
const stringifyImport = (options) => {
  const { defaultSymbol, nonDefaultSymbols, type, path } = options;
  let result = 'import ';
  if (type === 'type') result += 'type ';
  if (defaultSymbol) {
    result += defaultSymbol + ' ';
    if (nonDefaultSymbols.length > 0)
      result +=
        '{ ' +
        nonDefaultSymbols
          .map((s) => (typeof s === 'string' ? s : `${s[0]} as ${s[1]}`))
          .join(', ') +
        ' } ';
  } else {
    result +=
      '{ ' +
      nonDefaultSymbols
        .map((s) => (typeof s === 'string' ? s : `${s[0]} as ${s[1]}`))
        .join(', ') +
      ' } ';
  }
  result += `from '${path}';`;
  return result;
};

/**
 * @param {string} statement
 * @returns
 */
const resolveImport = (statement) => {
  const trimmed = statement.trim();
  const type = trimmed.split('import', 2)[1].trim().startsWith('type')
    ? 'type'
    : 'value';
  const withoutHead = trimmed.replace(/^import\s+/, '').replace(/^type\s+/, '');
  const symbols = withoutHead.startsWith('{')
    ? {
        default: '',
        nonDefault: withoutHead
          .slice(1)
          .split('}', 2)[0]
          .trim()
          .split(',')
          .map(R.trim)
          .map((s) => {
            const match = s.match(/^(\S+)\s+as\s+(\S+)$/);
            if (!match) return s;
            /** @type {[string, string]} */
            const result = [match[1], match[2]];
            return result;
          })
          .map((s) => s),
      }
    : { default: withoutHead.split(/\s+/, 2)[0].trim(), nonDefault: [] };
  const path = trimmed.match(/'(.*)'/)?.[1] ?? '';
  return {
    statement,
    /** @type {'value' | 'type'} */
    type: type,
    symbols,
    path,
  };
};

/**
 * @param {string} content
 * @returns {string[]}
 */
const extractImports = (content) =>
  content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('import'))
    .map((line) => line.match(/'(.*)'/)?.[1] ?? '')
    .map((line) => line.replace(/^\.\/(.*)$/, '$1'));

const patchesDir = path.join(__dirname, 'src', 'patches');
const patchesIndex = path.join(patchesDir, 'index.ts');
const modules = extractImports(fs.readFileSync(patchesIndex, 'utf-8'));

/**
 * @param {string} code
 * @returns {string}
 */
const renameDuplicateImports = (code) => {
  const lines = code.split('\n');

  let final = true;
  /** @type {ReturnType<typeof resolveImport>[]} */
  const resolves = [];

  let i = 0;
  for (; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (line.startsWith('import')) {
      let statement = trimmed;
      if (trimmed.endsWith('{')) {
        statement += ' ';
        while (!lines[++i].startsWith('}')) statement += lines[i].trim() + ' ';
        statement = statement.replace(/,\s*$/, '');
        statement += ' ' + lines[i].trim();
      }
      const resolved = resolveImport(statement);
      resolves.push(resolved);
      const oldResolvedSymbols = [
        ...(imports[resolved.path]?.value.default
          ? [imports[resolved.path].value.default]
          : []),
        ...(imports[resolved.path]?.value.nonDefault.map((s) =>
          typeof s === 'string' ? s : s[1],
        ) ?? []),
        ...(imports[resolved.path]?.type.default
          ? [imports[resolved.path].type.default]
          : []),
        ...(imports[resolved.path]?.type.nonDefault.map((s) =>
          typeof s === 'string' ? s : s[1],
        ) ?? []),
      ];
      const resolvedSymbols = [
        ...(resolved.symbols.default ? [resolved.symbols.default] : []),
        ...(resolved.symbols.nonDefault.map((s) =>
          typeof s === 'string' ? s : s[1],
        ) ?? []),
      ];
      for (const symbol of resolvedSymbols) {
        if (symbols.has(symbol) && !oldResolvedSymbols.includes(symbol)) {
          final = false;
          return renameDuplicateImports(renameImport(code, symbol));
        }
      }
    }
  }

  if (final)
    for (const resolved of resolves) {
      const resolvedSymbols = [
        ...(resolved.symbols.default ? [resolved.symbols.default] : []),
        ...(resolved.symbols.nonDefault.map((s) =>
          typeof s === 'string' ? s : s[1],
        ) ?? []),
      ];
      if (resolved.path in imports) {
        const oldResolved = imports[resolved.path];
        const oldResolvedSymbolsValue = [
          ...(oldResolved.value.default ? [oldResolved.value.default] : []),
          ...(oldResolved.value.nonDefault.map((s) =>
            typeof s === 'string' ? s : s[1],
          ) ?? []),
        ];
        const oldResolvedSymbolsType = [
          ...(oldResolved.type.default ? [oldResolved.type.default] : []),
          ...(oldResolved.type.nonDefault.map((s) =>
            typeof s === 'string' ? s : s[1],
          ) ?? []),
        ];
        const oldResolvedSymbols = new Set([
          ...oldResolvedSymbolsValue,
          ...oldResolvedSymbolsType,
        ]);
        for (const symbol of resolvedSymbols) {
          if (!oldResolvedSymbols.has(symbol)) {
            if (symbol === resolved.symbols.default)
              oldResolved[resolved.type].default = symbol;
            else oldResolved[resolved.type].nonDefault.push(symbol);
          } else if (
            oldResolvedSymbols.has(symbol) &&
            resolved.type === 'value' &&
            !oldResolvedSymbolsValue.includes(symbol)
          ) {
            if (oldResolved.type.default === symbol) {
              oldResolved.type.default = '';
              oldResolved.value.default = symbol;
            } else {
              oldResolved.type.nonDefault = oldResolved.type.nonDefault.filter(
                (s) => s !== symbol,
              );
              oldResolved.value.nonDefault.push(symbol);
            }
          }
        }
        oldResolved.value.nonDefault = R.sortBy(
          (s) => (typeof s === 'string' ? s : s[1]),
          oldResolved.value.nonDefault,
        );
        oldResolved.type.nonDefault = R.sortBy(
          (s) => (typeof s === 'string' ? s : s[1]),
          oldResolved.type.nonDefault,
        );
      } else {
        imports[resolved.path] = {
          value: { default: '', nonDefault: [] },
          type: { default: '', nonDefault: [] },
          ...{
            [resolved.type]: {
              default: resolved.symbols.default,
              nonDefault: R.sortBy(
                (s) => (typeof s === 'string' ? s : s[1]),
                resolved.symbols.nonDefault,
              ),
            },
          },
        };
      }
      for (const symbol of resolvedSymbols) symbols.add(symbol);
    }

  return lines.join('\n');
};

let globalDeclarations = '';
const others = [];
for (const module of modules) {
  const moduleDir = path.join(patchesDir, module);
  const moduleIndex = path.join(moduleDir, 'index.ts');
  const filenames = extractImports(fs.readFileSync(moduleIndex, 'utf-8'));
  for (const filename of filenames) {
    const filePathname = path.join(moduleDir, `${filename}.ts`);
    const content = renameDuplicateImports(
      fs.readFileSync(filePathname, 'utf-8'),
    );
    const lines = content.split('\n');
    let inGlobalDeclarations = false;
    let i = 0;
    for (; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      if (trimmed.startsWith('import')) {
        if (trimmed.endsWith('{')) while (!lines[++i].trim().startsWith('}'));
      } else {
        others.push(line);
      }
      if (line === 'declare global {') {
        inGlobalDeclarations = true;
        globalDeclarations += '\n' + line + '\n';
        continue;
      }
      if (inGlobalDeclarations) {
        if (line === '}') {
          inGlobalDeclarations = false;
          globalDeclarations += line + '\n';
          continue;
        }
        globalDeclarations += line + '\n';
      }
    }
  }
}

// Handle relative paths
for (const key of Object.keys(imports)) {
  const newKey = key.replace(/^\.\.\/\.\.\/(.*?)$/, './$1');
  if (key === newKey) continue;
  imports[newKey] = imports[key];
  delete imports[key];
}

// Sort imports
imports = Object.fromEntries(Object.entries(imports).sort());

// Sort imports
const topValueImports = [];
const topTypeImports = [];
const relativeValueImports = [];
const relativeTypeImports = [];
for (const [path, { type: typeSymbols, value: valueSymbols }] of Object.entries(
  imports,
)) {
  if (path.startsWith('.')) {
    if (valueSymbols.default || valueSymbols.nonDefault.length > 0)
      relativeValueImports.push(
        stringifyImport({
          defaultSymbol: valueSymbols.default,
          nonDefaultSymbols: valueSymbols.nonDefault,
          type: 'value',
          path,
        }),
      );
    if (typeSymbols.default || typeSymbols.nonDefault.length > 0)
      relativeTypeImports.push(
        stringifyImport({
          defaultSymbol: typeSymbols.default,
          nonDefaultSymbols: typeSymbols.nonDefault,
          type: 'type',
          path,
        }),
      );
  } else {
    if (valueSymbols.default || valueSymbols.nonDefault.length > 0)
      topValueImports.push(
        stringifyImport({
          defaultSymbol: valueSymbols.default,
          nonDefaultSymbols: valueSymbols.nonDefault,
          type: 'value',
          path,
        }),
      );
    if (typeSymbols.default || typeSymbols.nonDefault.length > 0)
      topTypeImports.push(
        stringifyImport({
          defaultSymbol: typeSymbols.default,
          nonDefaultSymbols: typeSymbols.nonDefault,
          type: 'type',
          path,
        }),
      );
  }
}

/**
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
const compareImportPaths = (a, b) => {
  const aPath = (a.match(/'(.*)'/) ?? ['', ''])[1];
  const bPath = (b.match(/'(.*)'/) ?? ['', ''])[1];
  if (aPath < bPath) return -1;
  if (aPath > bPath) return 1;
  return 0;
};
topValueImports.sort(compareImportPaths);
topTypeImports.sort(compareImportPaths);
relativeValueImports.sort(compareImportPaths);
relativeTypeImports.sort(compareImportPaths);

// Export
/** @type {string[]} */
const valueExports = [];
/** @type {string[]} */
const typeExports = [];
for (const [path, { type: typeSymbols, value: valueSymbols }] of Object.entries(
  imports,
)) {
  if (valueSymbols.default) valueExports.push(valueSymbols.default);
  valueExports.push(
    ...valueSymbols.nonDefault.map((s) => (typeof s === 'string' ? s : s[1])),
  );
  if (typeSymbols.default) typeExports.push(typeSymbols.default);
  typeExports.push(
    ...typeSymbols.nonDefault.map((s) => (typeof s === 'string' ? s : s[1])),
  );
}
valueExports.sort();
typeExports.sort();

const result = [
  ...topValueImports,
  ...(topValueImports.length > 0 ? [''] : []),
  ...relativeValueImports,
  ...(relativeValueImports.length > 0 ? [''] : []),
  ...relativeTypeImports,
  ...topTypeImports,
  ...(relativeTypeImports.length > 0 || topTypeImports.length > 0 ? [''] : []),
  ...(valueExports.length > 0
    ? [`export { ${valueExports.join(', ')} };`]
    : []),
  ...(typeExports.length > 0
    ? [`export type { ${typeExports.join(', ')} };`]
    : []),
  ...(valueExports.length > 0 || typeExports.length > 0 ? [''] : []),
  ...others,
  ...(others.length > 0 ? [''] : []),
  '// @ts-expect-error - `patch` should be assigned',
  'patch(globalThis).withStatic({ patch })',
]
  .join('\n')
  .replace(/\n{3,}/g, '\n\n');

const prettierConfig = prettier.resolveConfig.sync(
  path.join(__dirname, 'prettier.config.cjs'),
);
const formatted = prettier.format(result, {
  ...prettierConfig,
  parser: 'typescript',
});

fs.writeFileSync('global-declarations-temp.d.ts', globalDeclarations);
fs.writeFileSync(MIN_FILE_PATHNAME, formatted);
