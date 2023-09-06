/**
 * Returns a supplied numeric expression rounded to the nearest integer (using `Math.round`).
 * @param n The number to round.
 *
 * @example
 * ```typescript
 * round(1.95); // => 2
 * round(1.5); // => 2
 * round(1.05); // => 1
 * round(3); // => 3
 * round(-1.95); // => -2
 * round(-1.5); // => -1
 * round(-1.05); // => -1
 * ```
 *
 * @see {@link Math.round}
 */
const round = (n: number): number => Math.round(n);

export default round;
