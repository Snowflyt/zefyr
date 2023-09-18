/**
 * Exclude `undefined` from `T`.
 */
export type NonUndefined<T> = Exclude<T, undefined>;

/**
 * Returns `true` if the value is not undefined.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isNonUndefined(null); // => true
 * isNonUndefined(undefined); // => false
 * isNonUndefined(''); // => true
 * isNonUndefined(' '); // => true
 * isNonUndefined('a'); // => true
 * isNonUndefined(0); // => true
 * ```
 *
 * @example
 * ```typescript
 * const foo: string | null | undefined = null;
 * if (isNonUndefined(foo)) {
 *   const bar = foo; // bar :: string | null
 * }
 * ```
 *
 * @see {@link isUndefined}
 */
const isNonUndefined = <T>(value: T): value is NonUndefined<T> =>
  value !== undefined;

export default isNonUndefined;
