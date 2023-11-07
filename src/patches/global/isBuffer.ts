import isBuffer from '../../global/isBuffer';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * Returns `true` if the value is a buffer (using `Buffer.isBuffer` if `Buffer` exists,
   * otherwise always returns `false`).
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isBuffer(new Buffer(2)); // => true
   * isBuffer(new Uint8Array(2)); // => false
   * ```
   */
  function isBuffer(value: unknown): value is Buffer;
}

patch(globalThis).withStatic({ isBuffer });
