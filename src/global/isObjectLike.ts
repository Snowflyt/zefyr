/**
 * Returns `true` if the value is object-like, meaning it's not `null` and has a `typeof` result of `"object"`.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isObjectLike({}); // => true
 * isObjectLike([1, 2, 3]); // => true
 * isObjectLike(new Set([1, 2, 3])); // => true
 * isObjectLike(new Map([['a', 1], ['b', 2], ['c', 3]])); // => true
 * isObjectLike(null); // => false
 * isObjectLike(undefined); // => false
 * isObjectLike(0); // => false
 * ```
 */
const isObjectLike = (value: unknown): value is Record<PropertyKey, unknown> =>
  typeof value === 'object' && value !== null;

export default isObjectLike;
