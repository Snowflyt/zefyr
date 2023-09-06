/**
 * The sign of the number, indicating whether x is positive, negative or zero (using `Math.sign`).
 *
 * @example
 * ```typescript
 * sign(1.95); // => 1
 * sign(-2); // => -1
 * sign(0); // => 0
 * sign(-0); // => -0
 * sign(NaN); // => NaN
 * sign(Infinity); // => 1
 * sign(Infinity); // => -1
 * ```
 */
const sign = (n: number): number => Math.sign(n);

export default sign;
