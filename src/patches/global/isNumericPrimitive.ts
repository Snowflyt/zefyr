import { patch } from '../../.internal/utils/patch';
import isNumericPrimitive from '../../global/isNumericPrimitive';

declare global {
  /**
   * Returns `true` if the value is a numeric primitive (number primitive or bigint primitive).
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isNumericPrimitive(0); // => true
   * isNumericPrimitive(1); // => true
   * isNumericPrimitive(1.5); // => true
   * isNumericPrimitive(0n); // => true
   * isNumericPrimitive(1n); // => true
   * isNumericPrimitive(''); // => false
   * ```
   */
  function isNumericPrimitive(value: unknown): value is number | bigint;
}

patch(globalThis).withStatic({ isNumericPrimitive });
