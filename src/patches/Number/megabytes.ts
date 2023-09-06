import megabytes from '../../Number/megabytes';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * The corresponding size represented in megabytes.
     *
     * @example
     * ```typescript
     * (2).megabytes; // => 2097152
     * ```
     */
    readonly megabytes: number;
  }
}

patch(Number).withGetter({ megabytes });
