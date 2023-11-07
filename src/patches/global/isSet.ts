import isSet from '../../global/isSet';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * Returns `true` if the value is a `Set`.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isSet(new Set()); // => true
   * isSet(new WeakSet()); // => false
   * ```
   */
  function isSet(value: unknown): value is Set<unknown>;
}

patch(globalThis).withStatic({ isSet });
