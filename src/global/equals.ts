import getTag from '../.internal/_getTag';

import isObject from './isObject';

const _arrayFromIterator = <T>(iter: Iterator<T>): T[] => {
  const result = [];
  let next;
  while (!(next = iter.next()).done) result.push(next.value);
  return result;
};

const _includesWith = <T>(
  pred: (a: T[] | T, b: T) => boolean,
  x: T[] | T,
  list: T[] | T,
) => {
  const len = (list as T[]).length;
  for (let i = 0; i < len; i++) if (pred(x, (list as T[])[i]!)) return true;
  return false;
};

/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparison of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 */
const _uniqContentEquals = <T>(
  aIterator: Iterator<T>,
  bIterator: Iterator<T>,
  stackA: T[],
  stackB: T[],
) => {
  const a = _arrayFromIterator(aIterator);
  const b = _arrayFromIterator(bIterator);
  const eq = (_a: T | T[], _b: T) =>
    _equals(_a, _b, stackA.slice(), stackB.slice());
  // if *a* array contains any element that is not included in *b*
  return !_includesWith(
    (b, aItem): boolean => !_includesWith(eq, aItem, b),
    b,
    a,
  );
};

const _equals = <T>(a: T, b: T, stackA: T[], stackB: T[]) => {
  if (Object.is(a, b)) return true;

  const tagA = getTag(a);
  if (tagA !== getTag(b)) return false;

  // For interoperability with fantasy-land
  if (
    (isObject(a) &&
      'fantasy-land/equals' in a &&
      typeof a['fantasy-land/equals'] === 'function') ||
    (isObject(b) &&
      'fantasy-land/equals' in b &&
      typeof b['fantasy-land/equals'] === 'function')
  )
    return (
      isObject(a) &&
      'fantasy-land/equals' in a &&
      typeof a['fantasy-land/equals'] === 'function' &&
      a['fantasy-land/equals'](b) &&
      isObject(b) &&
      'fantasy-land/equals' in b &&
      typeof b['fantasy-land/equals'] === 'function' &&
      b['fantasy-land/equals'](a)
    );

  // For interoperability with any custom `equals` methods added to prototypes
  if (
    (isObject(a) && 'equals' in a && typeof a.equals === 'function') ||
    (isObject(b) && 'equals' in b && typeof b.equals === 'function')
  ) {
    return (
      isObject(a) &&
      'equals' in a &&
      typeof a.equals === 'function' &&
      a.equals(b) &&
      isObject(b) &&
      'equals' in b &&
      typeof b.equals === 'function' &&
      b.equals(a)
    );
  }

  switch (tagA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (
        typeof (a as object).constructor === 'function' &&
        (a as object).constructor.name === 'Promise'
      )
        return a === b;
      break;

    case 'Boolean':
    case 'Number':
    case 'String':
      if (
        !(
          typeof a === typeof b &&
          Object.is((a as string).valueOf(), (b as string).valueOf())
        )
      )
        return false;
      break;

    case 'Date':
      if (Object.is((a as Date).valueOf(), (a as Date).valueOf())) return false;
      break;

    case 'Error':
      return (
        (a as Error).name === (b as Error).name &&
        (a as Error).message === (b as Error).message
      );

    case 'RegExp':
      if (
        !(
          (a as RegExp).source === (b as RegExp).source &&
          (a as RegExp).global === (b as RegExp).global &&
          (a as RegExp).ignoreCase === (b as RegExp).ignoreCase &&
          (a as RegExp).multiline === (b as RegExp).multiline &&
          (a as RegExp).sticky === (b as RegExp).sticky &&
          (a as RegExp).unicode === (b as RegExp).unicode
        )
      )
        return false;
      break;
  }

  let idx = stackA.length - 1;

  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }

    idx -= 1;
  }

  switch (tagA) {
    case 'Map':
      if (
        (a as Map<unknown, unknown>).size !== (b as Map<unknown, unknown>).size
      )
        return false;

      return _uniqContentEquals<T>(
        (a as Map<unknown, unknown>).entries() as Iterator<T>,
        (b as Map<unknown, unknown>).entries() as Iterator<T>,
        stackA.concat([a]),
        stackB.concat([b]),
      );

    case 'Set':
      if ((a as Set<unknown>).size !== (b as Set<unknown>).size) {
        return false;
      }

      return _uniqContentEquals(
        (a as Set<unknown>).values(),
        (b as Set<unknown>).values(),
        stackA.concat([a]),
        stackB.concat([b]),
      );

    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;

    default:
      // Values of other types are only equal if identical.
      return false;
  }

  const keysA = isObject(a) ? Object.keys(a) : [];

  if (keysA.length !== (isObject(b) ? Object.keys(b) : []).length) return false;

  const extendedStackA = stackA.concat([a]);
  const extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;

  while (idx >= 0) {
    const key = keysA[idx];

    if (
      !(
        Object.prototype.hasOwnProperty.call(b, key as PropertyKey) &&
        _equals(
          b[key as keyof typeof b],
          a[key as keyof typeof a],
          extendedStackA as T[keyof T][],
          extendedStackB as T[keyof T][],
        )
      )
    ) {
      return false;
    }

    idx -= 1;
  }

  return true;
};

/**
 * Returns `true` if its arguments are equivalent (recursively). Handles cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if present.
 * @param a The first item to compare.
 * @param b The second item to compare.
 *
 * @example
 * ```typescript
 * equals(1, 1); //=> true
 * equals(1, '1'); //=> false
 * equals([1, 2, 3], [1, 2, 3]); //=> true
 * equals({ a: [1], b: { c: 'd' } }, { a: [1], b: { c: 'd' } }); //=> true
 *
 * const a = {};
 * a.v = a;
 * const b = {};
 * b.v = b;
 * equals(a, b); //=> true
 * ```
 */
const equals: {
  <T>(a: unknown, b: T): a is T;
  <T>(b: T): (a: unknown) => a is T;
} = ((...args: unknown[]) =>
  args.length === 1
    ? (a: unknown) => _equals(a, args[0], [], [])
    : _equals(args[0], args[1], [], [])) as {
  <T>(a: unknown, b: T): a is T;
  <T>(b: T): (a: unknown) => a is T;
};

export default equals;
