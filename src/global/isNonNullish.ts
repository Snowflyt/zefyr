/**
 * Exclude `null` and `undefined` from `T`.
 */
export type NonNullish<T> = Exclude<T, null | undefined>;

/**
 * Returns `true` if the value is not null or undefined.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isNonNullish(null); // => false
 * isNonNullish(undefined); // => false
 * isNonNullish(''); // => true
 * isNonNullish(' '); // => true
 * isNonNullish('a'); // => true
 * isNonNullish(0); // => true
 * ```
 *
 * @example
 * ```typescript
 * const foo: string | null | undefined = null;
 * if (isNonNullish(foo)) {
 *   const bar = foo; // bar :: string
 * }
 * ```
 *
 * @see {@link isNullish}
 */
const isNonNullish = <T>(value: T): value is NonNullish<T> => value !== null && value !== undefined;

export default isNonNullish;
