import { patch } from '../../.internal/utils/patch';
import isLength from '../../global/isLength';

declare global {
  /**
   * Returns `true` if the value is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isLength(3); // => true
   * isLength(-1); // => false
   * isLength(1.23); // => false
   * isLength(Number.MAX_SAFE_INTEGER); // => true
   * isLength(Number.MAX_SAFE_INTEGER + 1); // => false
   * isLength(Infinity); // => false
   * ```
   */
  function isLength(value: unknown): value is number;
}

patch(globalThis).withStatic({ isLength });
