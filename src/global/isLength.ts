/**
 * Returns `true` if the value is a valid array-like length (i.e. an integer between `0` and `Number.MAX_SAFE_INTEGER`).
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isLength(3); // => true
 * isLength(-1); // => false
 * isLength(1.23); // => false
 * isLength(Number.MAX_SAFE_INTEGER); // => true
 * isLength(Number.MAX_SAFE_INTEGER + 1); // => false
 * isLength(Infinity); // => false
 * ```
 */
const isLength = (value: unknown): value is number =>
  typeof value == 'number' &&
  value > -1 &&
  value % 1 == 0 &&
  value <= Number.MAX_SAFE_INTEGER;

export default isLength;
