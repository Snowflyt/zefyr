import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// @ts-expect-error - `prettier` is not typed
import prettier from 'prettier';
import { Project, ts } from 'ts-morph';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MIN_FILE_PATHNAME = path.join(__dirname, 'src', 'zefyr.min.ts');
const MIN_DTS_FILE_PATHNAME = path.join(__dirname, 'build', 'zefyr.min.d.ts');
const PACKAGEJSON_PATHNAME = path.join(__dirname, 'package.json');

fs.rmSync(MIN_FILE_PATHNAME);

fs.writeFileSync(
  PACKAGEJSON_PATHNAME,
  fs
    .readFileSync(PACKAGEJSON_PATHNAME, 'utf-8')
    .replace('"types": "./dist/zefyr.min.d.ts"', '"types": "./index.d.ts"'),
);

fs.appendFileSync(MIN_DTS_FILE_PATHNAME, fs.readFileSync('global-declarations-temp.d.ts', 'utf-8'));
fs.rmSync('global-declarations-temp.d.ts');

const refactorCode = (filePath: string) => {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);

  for (const statement of sourceFile.getStatements()) {
    const text = statement.getText();
    if (/^\s*export\s+declare\s+const/.test(text) || /^\s*export\s+{/.test(text)) {
      if (
        text
          .replace(/^\s*export\s+declare\s+const/, '')
          .trimStart()
          .startsWith('patch: ')
      )
        statement.replaceWithText(
          'declare global {\n' + text.replace(/^\s*export\s+declare\s+const/, 'const') + '\n}',
        );
      else statement.replaceWithText('\n');
    } else if (/^\s*(?:export\s+)?declare\s+((?:type)|(?:interface))/.test(text)) {
      const newStatementText = text.replace(
        /^\s*(?:export\s+)?declare\s+((?:type)|(?:interface))/,
        '$1',
      );
      statement.replaceWithText(newStatementText);
    } else if (/^\s*declare\s+interface/.test(text)) {
      const newStatementText = text.replace(/^\s*declare\s+interface/, 'interface');
      statement.replaceWithText(newStatementText);
    }
  }

  for (const statement of sourceFile.getStatements()) {
    const kind = statement.getKind();
    if (
      kind === ts.SyntaxKind.TypeAliasDeclaration ||
      kind === ts.SyntaxKind.InterfaceDeclaration ||
      kind === ts.SyntaxKind.VariableStatement ||
      kind === ts.SyntaxKind.FunctionDeclaration ||
      kind === ts.SyntaxKind.ClassDeclaration ||
      kind === ts.SyntaxKind.EnumDeclaration
    ) {
      if (kind === ts.SyntaxKind.VariableStatement) {
        const declarationList = statement.getFirstChildByKind(
          ts.SyntaxKind.VariableDeclarationList,
        );
        if (declarationList) {
          const declarations = declarationList.getDeclarations();
          let removeCount = 0;
          for (const declaration of declarations) {
            const references = declaration.findReferencesAsNodes();
            if (references.length === 0) {
              declaration.replaceWithText('\n');
              removeCount++;
            }
          }
          if (removeCount === declarations.length) {
            statement.replaceWithText('\n');
          }
        }
      } else {
        const name = statement.getFirstChildByKind(ts.SyntaxKind.Identifier);
        if (name) {
          const references = name.findReferences();
          if (references.length === 0) {
            statement.replaceWithText('\n');
          }
        }
      }
    }
  }

  sourceFile.saveSync();
};

refactorCode(MIN_DTS_FILE_PATHNAME);

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const prettierConfig = prettier.resolveConfig.sync(path.join(__dirname, 'prettier.config.cjs'));
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const formatted: string = prettier.format(fs.readFileSync(MIN_DTS_FILE_PATHNAME, 'utf-8'), {
  ...prettierConfig,
  parser: 'typescript',
  printWidth: 80,
});

fs.writeFileSync(MIN_DTS_FILE_PATHNAME, formatted);
