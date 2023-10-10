import isEmpty from '../../Array/isEmpty';
import { patch } from '../../internal/utils/patch';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Returns `true` if length of the array is `0`.
     *
     * @example
     * ```typescript
     * [].isEmpty(); // => true
     * [1, 2, 3].isEmpty(); // => false
     * ```
     */
    isEmpty<const AS extends unknown[]>(this: AS): this is [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Returns `true` if length of the array is `0`.
     *
     * @example
     * ```typescript
     * [].isEmpty(); // => true
     * [1, 2, 3].isEmpty(); // => false
     * ```
     */
    isEmpty<const AS extends readonly unknown[]>(this: AS): this is readonly [];
  }
}

patch(Array).with({ isEmpty });
