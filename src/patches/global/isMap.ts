import isMap from '../../global/isMap';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * Returns `true` if the value is a `Map`.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isMap(new Map()); // => true
   * isMap(new WeakMap()); // => false
   * ```
   */
  function isMap(value: unknown): value is Map<unknown, unknown>;
}

patch(globalThis).withStatic({ isMap });
