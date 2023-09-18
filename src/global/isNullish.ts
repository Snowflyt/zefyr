/**
 * A type that is either null or undefined.
 */
type Nullish = null | undefined;

/**
 * Returns `true` if the value is null or undefined.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isNullish(null); // => true
 * isNullish(undefined); // => true
 * isNullish(''); // => false
 * isNullish(' '); // => false
 * isNullish('a'); // => false
 * isNullish(0); // => false
 * ```
 *
 * @example
 * ```typescript
 * const foo: string | null = null;
 * if (isNullish(foo)) {
 *   const bar = foo; // bar :: null
 * }
 * ```
 */
const isNullish = (value: unknown): value is Nullish =>
  value === null || value === undefined;

export default isNullish;
