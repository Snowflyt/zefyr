import { patch } from '../../.internal/utils/patch';
import isStringPrimitive from '../../global/isStringPrimitive';

declare global {
  /**
   * Returns `true` if the value is a string primitive.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isStringPrimitive(''); // => true
   * isStringPrimitive('a'); // => true
   * isStringPrimitive(0); // => false
   * ```
   */
  function isStringPrimitive(value: unknown): value is string;
}

patch(globalThis).withStatic({ isStringPrimitive });
