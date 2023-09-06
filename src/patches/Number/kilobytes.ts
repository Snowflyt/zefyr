import kilobytes from '../../Number/kilobytes';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * The corresponding size represented in kilobytes.
     *
     * @example
     * ```typescript
     * (2).kilobytes; // => 2048
     * ```
     */
    readonly kilobytes: number;
  }
}

patch(Number).withGetter({ kilobytes });
