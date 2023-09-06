import Fraction from 'fraction.js';

/**
 * The denominator of the `Fraction` representation of the number (using `fraction.js`).
 *
 * @example
 * ```typescript
 * 1.5.denominator; // => 2
 * 2.6.denominator; // => 5
 * (3).denominator; // => 1
 * ```
 *
 * @see {@link https://github.com/rawify/Fraction.js}
 */
const denominator = (n: number): number => new Fraction(n).d;

export default denominator;
