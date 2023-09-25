import isBigInt from '../../global/isBigInt';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * Returns `true` if the value is classified as a bigint primitive or object.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isBigInt(0n); // => true
   * isBigInt(1n); // => true
   * isBigInt(Object(BigInt(1))); // => true
   * isBigInt(''); // => false
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  function isBigInt(value: unknown): value is bigint | BigInt;
}

patch(globalThis).withStatic({ isBigInt });
