import gigabytes from '../../Number/gigabytes';
import { patch } from '../../utils/patch';

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
