import isSymbol from '../../global/isSymbol';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * Returns `true` if the value is classified as a symbol primitive or object.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isSymbol(Symbol('foo')); // => true
   * isSymbol(Symbol.iterator); // => true
   * isSymbol(Object(Symbol('foo'))); // => true
   * isSymbol('foo'); // => false
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  function isSymbol(value: unknown): value is symbol | Symbol;
}

patch(globalThis).withStatic({ isSymbol });
