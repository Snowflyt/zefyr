import toFraction from '../../Number/toFraction';
import { patch } from '../../internal/utils/patch';

import type Fraction from 'fraction.js';

declare global {
  interface Number {
    /**
     * Converts the number to a `Fraction` instance in `fraction.js`.
     * If the number is an integer, the result is a `Fraction` instance with denominator 1.
     *
     * @example
     * ```typescript
     * 1.5.toFraction(); // => Fraction { s: 1, n: 3, d: 2 }
     * (3).toFraction(); // => Fraction { s: 1, n: 3, d: 1 }
     * ```
     *
     * @see {@link https://github.com/rawify/Fraction.js}
     */
    toFraction(): Fraction;
  }
}

patch(Number).with({ toFraction });
