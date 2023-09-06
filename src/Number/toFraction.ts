import Fraction from 'fraction.js';

/**
 * Converts the number to a `Fraction` instance in `fraction.js`.
 * If the number is an integer, the result is a `Fraction` instance with denominator 1.
 * @param n The number to convert to a fraction.
 *
 * @example
 * ```typescript
 * toFraction(1.5); // => Fraction { s: 1, n: 3, d: 2 }
 * toFraction(3); // => Fraction { s: 1, n: 3, d: 1 }
 * ```
 *
 * @see {@link https://github.com/rawify/Fraction.js}
 */
const toFraction = (n: number): Fraction => new Fraction(n);

export default toFraction;
