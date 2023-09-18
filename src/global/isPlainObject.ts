import getTag from '../.internal/_getTag';

/**
 * Checks if the value is a plain object, that is, an object created by the `Object` constructor or one with a
 * `[[Prototype]]` of `null`.
 *
 * **Note**: This method assumes objects created by the Object constructor have no inherited enumerable properties.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * class Foo {
 *   a = 1;
 * }
 * isPlainObject(new Foo()); // => false
 * isPlainObject([1, 2, 3]); // => false
 * isPlainObject({ x: 1, y: 2 }); // => true
 * isPlainObject(Object.create(null)); // => true
 * ```
 */
const isPlainObject = (
  value: unknown,
): value is Record<string | number | symbol, unknown> => {
  if (value === null || value === undefined) return false;
  if (typeof value !== 'object' || getTag(value) !== 'Object') return false;
  if (Object.getPrototypeOf(value) === null) return true;
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null)
    proto = Object.getPrototypeOf(proto);
  return Object.getPrototypeOf(value) === proto;
};

export default isPlainObject;
