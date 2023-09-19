import { patch } from '../../.internal/utils/patch';
import isArrayLike from '../../global/isArrayLike';

declare global {
  /**
   * Returns `true` if the value is array-like (i.e. has a integer `length` property between `0` and `Number.MAX_SAFE_INTEGER`).
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isArrayLike([]); // => true
   * isArrayLike({ length: 2 }); // => true
   * isArrayLike({ length: 2.5 }); // => false
   * isArrayLike({ length: -1 }); // => false
   * isArrayLike({ length: Number.MAX_SAFE_INTEGER }); // => true
   * isArrayLike({ length: Number.MAX_SAFE_INTEGER + 1 }); // => false
   * isArrayLike({ length: Infinity }); // => false
   * isArrayLike('abc'); // => true
   * isArrayLike({}); // => false
   * ```
   */
  function isArrayLike(value: unknown): value is ArrayLike<unknown>;
}

patch(globalThis).withStatic({ isArrayLike });
