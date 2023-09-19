import { patch } from '../../.internal/utils/patch';
import isSymbolPrimitive from '../../global/isSymbolPrimitive';

declare global {
  /**
   * Returns `true` if the value is a symbol primitive.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isSymbolPrimitive(Symbol('foo')); // => true
   * isSymbolPrimitive(Symbol.iterator); // => true
   * isSymbolPrimitive('foo'); // => false
   * ```
   */
  function isSymbolPrimitive(value: unknown): value is symbol;
}

patch(globalThis).withStatic({ isSymbolPrimitive });
