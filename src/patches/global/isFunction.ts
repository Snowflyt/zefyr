import { patch } from '../../.internal/utils/patch';
import isFunction from '../../global/isFunction';

declare global {
  /**
   * Returns `true` if the value is a function.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isFunction(() => {}); // => true
   * isFunction(function() {}); // => true
   * isFunction(async () => {}); // => true
   * isFunction(function*() {}); // => true
   * isFunction(async function*() {}); // => true
   * isFunction(new Function()); // => true
   * isFunction(function*() {}.bind(null)); // => true
   * isFunction(async function*() {}.bind(null)); // => true
   * isFunction(new Proxy(() => {}, {})); // => true
   * isFunction(new Proxy({}, {})); // => true
   * isFunction(''); // => false
   * ```
   */
  function isFunction(value: unknown): value is (...args: unknown[]) => unknown;
}

patch(globalThis).withStatic({ isFunction });
