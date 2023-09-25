import sign from '../../Number/sign';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Number {
    /**
     * The sign of the number, indicating whether x is positive, negative or zero (using `Math.sign`).
     *
     * @example
     * ```typescript
     * 1.95.sign; // => 1
     * (-2).sign; // => -1
     * (0).sign; // => 0
     * (-0).sign; // => -0
     * NaN.sign; // => NaN
     * Infinity.sign; // => 1
     * (-Infinity).sign; // => -1
     * ```
     */
    readonly sign: number;
  }
}

patch(Number).withGetter({ sign });
