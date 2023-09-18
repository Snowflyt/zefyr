import { patch } from '../../.internal/utils/patch';
import petabytes from '../../Number/petabytes';

declare global {
  interface Number {
    /**
     * The corresponding size represented in petabytes.
     *
     * @example
     * ```typescript
     * (2).petabytes; // => 2251799813685248
     * ```
     */
    readonly petabytes: number;
  }
}

patch(Number).withGetter({ petabytes });
