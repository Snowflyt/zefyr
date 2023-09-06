import bytes from '../../Number/bytes';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * The corresponding size represented in bytes.
     * It simply returns the number itself.
     * This exists only for consistency with other size units.
     *
     * @example
     * ```typescript
     * (5).bytes; // => 5
     * ```
     */
    readonly bytes: number;
  }
}

patch(Number).withGetter({ bytes });
