import denominator from '../../Number/denominator';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
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
    readonly denominator: number;
  }
}

patch(Number).withGetter({ denominator });
