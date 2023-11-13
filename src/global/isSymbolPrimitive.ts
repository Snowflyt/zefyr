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
const isSymbolPrimitive = (value: unknown): value is symbol => typeof value === 'symbol';

export default isSymbolPrimitive;
