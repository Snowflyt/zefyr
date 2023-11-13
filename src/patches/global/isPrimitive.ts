import isPrimitive from '../../global/isPrimitive';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * Primitive types in TypeScript.
   */
  type Primitive = string | number | boolean | bigint | symbol | undefined | null;

  /**
   * Returns `true` if the value is a primitive.
   * @value The value to check.
   *
   * @example
   * ```typescript
   * isPrimitive(''); // => true
   * isPrimitive('a'); // => true
   * isPrimitive(0); // => true
   * isPrimitive(false); // => true
   * isPrimitive(null); // => true
   * isPrimitive(undefined); // => true
   * isPrimitive({}); // => false
   * isPrimitive([]); // => false
   * isPrimitive(() => {}); // => false
   * isObject(/a/); // => false
   * isObject(new Number(0)); // => false
   * isObject(new String('')); // => false
   * ```
   *
   * @see {@link isObject}
   */
  function isPrimitive(value: unknown): value is Primitive;
}

patch(globalThis).withStatic({ isPrimitive });
