import petabytes from '../../Number/petabytes';
import { patch } from '../../utils/patch';

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
