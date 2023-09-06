import bits from '../../Number/bits';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * An array of bits representing the number, from least significant to most significant.
     *
     * @example
     * ```typescript
     * 0b1010.bits; // => [0, 1, 0, 1]
     * 0b1010.bits[0]; // => 0
     * ```
     */
    readonly bits: number[];
  }
}

patch(Number).withGetter({ bits });
