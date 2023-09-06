/**
 * Returns the integral part of the number, removing any fractional digits (using `Math.trunc`).
 * If number is already an integer, the result is number.
 * @param n The number to trunc.
 *
 * @example
 * ```typescript
 * trunc(13.37); // => 13
 * trunc(42.84); // => 42
 * trunc(0.123); // =>  0
 * trunc(-0.123); // => -0
 * ```
 *
 * @see {@link Math.trunc}
 */
const trunc = (n: number): number => Math.trunc(n);

export default trunc;
