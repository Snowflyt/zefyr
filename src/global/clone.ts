import baseClone from '../internal/_baseClone';

/**
 * Returns a shallow clone of value.
 *
 * Note: This method is loosely based on the structured clone algorithm and supports cloning arrays,
 * array buffers, booleans, date objects, maps, numbers, Object objects, regexes, sets, strings, symbols,
 * and typed arrays. The own enumerable properties of arguments objects are cloned as plain objects. An empty
 * object is returned for uncloneable values such as error objects, functions, DOM nodes, and WeakMaps.
 *
 * @param value The value to clone.
 *
 * @example
 * ```typescript
 * const obj = { a: 1 };
 * const copy = clone(obj);
 * console.log(copy); // { a: 1 }
 * copy.a = 2;
 * console.log(obj); // { a: 1 }
 * console.log(copy); // { a: 2 }
 *
 * const objs = [{ a: 1 }, { b: 2 }];
 * const shallow = clone(objs);
 * shallow[0] === objs[0]; // => true
 * ```
 */
const clone = <T>(value: T): T => baseClone(value, false);

export default clone;
