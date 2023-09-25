import isBoolean from '../../global/isBoolean';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * Returns `true` if the value is classified as a boolean primitive or object.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isBoolean(true); // => true
   * isBoolean(false); // => true
   * isBoolean(new Boolean(true)); // => true
   * isBoolean(''); // => false
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  function isBoolean(value: unknown): value is boolean | Boolean;
}

patch(globalThis).withStatic({ isBoolean });
