import { patch } from '../../.internal/utils/patch';
import isString from '../../global/isString';

declare global {
  /**
   * Returns `true` if the value is a classified as a string primitive or object.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isString(''); // => true
   * isString('a'); // => true
   * isString(new String('')); // => true
   * isString(0); // => false
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  function isString(value: unknown): value is string | String;
}

patch(globalThis).withStatic({ isString });
