import { patch } from '../../.internal/utils/patch';
import isPlainObject from '../../global/isPlainObject';

declare global {
  /**
   * Checks if the value is a plain object, that is, an object created by the `Object` constructor or one with a
   * `[[Prototype]]` of `null`.
   *
   * **Note**: This method assumes objects created by the Object constructor have no inherited enumerable properties.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * class Foo {
   *   a = 1;
   * }
   * isPlainObject(new Foo()); // => false
   * isPlainObject([1, 2, 3]); // => false
   * isPlainObject({ x: 1, y: 2 }); // => true
   * isPlainObject(Object.create(null)); // => true
   * ```
   */
  function isPlainObject(
    value: unknown,
  ): value is Record<string | number | symbol, unknown>;
}

patch(globalThis).withStatic({ isPlainObject });
