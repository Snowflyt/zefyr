import terabytes from '../../Number/terabytes';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Number {
    /**
     * The corresponding size represented in terabytes.
     *
     * @example
     * ```typescript
     * (2).terabytes; // => 2199023255552
     * ```
     */
    readonly terabytes: number;
  }
}

patch(Number).withGetter({ terabytes });
