import numerator from '../../Number/numerator';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Number {
    /**
     * The numerator of the `Fraction` representation of the number (using `fraction.js`).
     *
     * @example
     * ```typescript
     * 1.5.numerator; // => 3
     * 2.6.numerator; // => 13
     * (3).numerator; // => 3
     * ```
     *
     * @see {@link https://github.com/rawify/Fraction.js}
     */
    readonly numerator: number;
  }
}

patch(Number).withGetter({ numerator });
