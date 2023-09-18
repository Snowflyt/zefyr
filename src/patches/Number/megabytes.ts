import { patch } from '../../.internal/utils/patch';
import megabytes from '../../Number/megabytes';

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
