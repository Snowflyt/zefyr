import isObjectLike from '../../global/isObjectLike';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * Returns `true` if the value is object-like, meaning it's not `null` and has a `typeof` result of `"object"`.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isObjectLike({}); // => true
   * isObjectLike([1, 2, 3]); // => true
   * isObjectLike(new Set([1, 2, 3])); // => true
   * isObjectLike(new Map([['a', 1], ['b', 2], ['c', 3]])); // => true
   * isObjectLike(null); // => false
   * isObjectLike(undefined); // => false
   * isObjectLike(0); // => false
   * ```
   */
  function isObjectLike(value: unknown): value is Record<PropertyKey, unknown>;
}

patch(globalThis).withStatic({ isObjectLike });
