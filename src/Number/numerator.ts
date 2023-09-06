import Fraction from 'fraction.js';

/**
 * The numerator of the `Fraction` representation of the number (using `fraction.js`).
 *
 * @example
 * ```typescript
 * numerator(1.5); // => 3
 * numerator(2.6); // => 13
 * numerator(3); // => 3
 * ```
 *
 * @see {@link https://github.com/rawify/Fraction.js}
 */
const numerator = (n: number): number => new Fraction(n).n;

export default numerator;
