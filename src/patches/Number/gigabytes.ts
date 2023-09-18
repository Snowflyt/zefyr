import { patch } from '../../.internal/utils/patch';
import gigabytes from '../../Number/gigabytes';

declare global {
  interface Number {
    /**
     * The corresponding size represented in gigabytes.
     *
     * @example
     * ```typescript
     * (2).gigabytes; // => 2147483648
     * ```
     */
    readonly gigabytes: number;
  }
}

patch(Number).withGetter({ gigabytes });
