import isBooleanPrimitive from '../../global/isBooleanPrimitive';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * Returns `true` if the value is a boolean primitive.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isBooleanPrimitive(true); // => true
   * isBooleanPrimitive(false); // => true
   * isBooleanPrimitive(0); // => false
   * ```
   */
  function isBooleanPrimitive(value: unknown): value is boolean;
}

patch(globalThis).withStatic({ isBooleanPrimitive });
