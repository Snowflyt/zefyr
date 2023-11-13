/**
 * Returns `true` if the value is a number primitive.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isNumberPrimitive(0); // => true
 * isNumberPrimitive(1); // => true
 * isNumberPrimitive(1.5); // => true
 * isNumberPrimitive(''); // => false
 * ```
 */
const isNumberPrimitive = (value: unknown): value is number => typeof value === 'number';

export default isNumberPrimitive;
