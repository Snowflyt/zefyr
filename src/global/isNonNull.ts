/**
 * Exclude `null` from `T`.
 */
export type NonNull<T> = Exclude<T, null>;

/**
 * Returns true if the value is not null.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isNonNull(null); // => false
 * isNonNull(undefined); // => true
 * isNonNull(''); // => true
 * isNonNull(' '); // => true
 * isNonNull('a'); // => true
 * isNonNull(0); // => true
 * ```
 *
 * @example
 * ```typescript
 * const foo: string | null | undefined = null;
 * if (isNonNull(foo)) {
 *   const bar = foo; // bar :: string | undefined
 * }
 * ```
 *
 * @see {@link isNull}
 */
const isNonNull = <T>(value: T): value is NonNull<T> => value !== null;

export default isNonNull;
