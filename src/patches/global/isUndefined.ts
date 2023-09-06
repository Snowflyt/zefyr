import isUndefined from '../../global/isUndefined';
import { patch } from '../../utils/patch';

declare global {
  /**
   * Returns true if the value is undefined.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isUndefined(null); // => false
   * isUndefined(undefined); // => true
   * isUndefined(''); // => false
   * isUndefined(' '); // => false
   * isUndefined('a'); // => false
   * isUndefined(0); // => false
   * ```
   *
   * @example
   * ```typescript
   * const foo: string | undefined = null;
   * if (isUndefined(foo)) {
   *   const bar = foo; // bar :: undefined
   * }
   * ```
   */
  function isUndefined(value: unknown): value is undefined;
}

patch(globalThis).withStatic({ isUndefined });
