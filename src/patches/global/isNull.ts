import { patch } from '../../.internal/utils/patch';
import isNull from '../../global/isNull';

declare global {
  /**
   * Returns `true` if the value is null.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isNull(null); // => true
   * isNull(undefined); // => false
   * isNull(''); // => false
   * isNull(' '); // => false
   * isNull('a'); // => false
   * isNull(0); // => false
   * ```
   *
   * @example
   * ```typescript
   * const foo: string | null = null;
   * if (isNull(foo)) {
   *   const bar = foo; // bar :: null
   * }
   * ```
   */
  function isNull(value: unknown): value is null;
}

patch(globalThis).withStatic({ isNull });
