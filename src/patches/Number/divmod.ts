import divmod from '../../Number/divmod';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Number {
    /**
     * Returns the quotient and remainder of the number divided by the divisor.
     *
     * @example
     * ```typescript
     * (11).divmod(4); // => [2, 3]
     * (-11).divmod(4); // => [-2, -3]
     * ```
     *
     * @see {@link Math.trunc}
     */
    divmod(divisor: number): [number, number];
  }
}

patch(Number).with({ divmod });
