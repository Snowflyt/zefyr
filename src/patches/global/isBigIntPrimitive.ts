import isBigIntPrimitive from '../../global/isBigIntPrimitive';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * Returns `true` if the value is a bigint primitive.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isBigIntPrimitive(0n); // => true
   * isBigIntPrimitive(1n); // => true
   * isBigIntPrimitive(''); // => false
   * ```
   */
  function isBigIntPrimitive(value: unknown): value is bigint;
}

patch(globalThis).withStatic({ isBigIntPrimitive });
