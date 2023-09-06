/**
 * Returns true if value is not null, undefined, or an empty
 *
 * @example
 * ```typescript
 * isNotEmpty(null); // => false
 * isNotEmpty(undefined); // => false
 * isNotEmpty(''); // => false
 * isNotEmpty(' '); // => true
 * isNotEmpty('a'); // => true
 * isNotEmpty(0); // => true
 * ```
 *
 * @example
 * ```typescript
 * const foo: number | null | '' = null;
 * if (isNotEmpty(foo)) {
 *   const bar = foo; // bar :: number
 * }
 * ```
 *
 * @see {@link isEmpty}
 */
const isNotEmpty = <T>(value: T): value is Exclude<T, null | undefined | ''> =>
  value != null && value !== '';

export default isNotEmpty;
