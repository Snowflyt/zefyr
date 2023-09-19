import _isLength from '../global/isLength';

/**
 * Returns `true` if the number is a valid array-like length (using `isLength`).
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
 *
 * @see {@link global.isLength}
 */
const isLength = (n: number): boolean => _isLength(n);

export default isLength;
