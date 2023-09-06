/**
 * Returns true if the value is null.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isNull(null); // => true
 * isNull(undefined); // => false
 * isNull(''); // => false
 * isNull(' '); // => false
 * isNull('a'); // => false
 * isNull(0); // => false
 * ```
 *
 * @example
 * ```typescript
 * const foo: string | null = null;
 * if (isNull(foo)) {
 *   const bar = foo; // bar :: null
 * }
 * ```
 */
const isNull = (value: unknown): value is null => value === null;

export default isNull;
