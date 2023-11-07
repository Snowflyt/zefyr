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
const isBuffer = (value: unknown): value is Buffer =>
  Buffer ? Buffer.isBuffer(value) : false;

export default isBuffer;
