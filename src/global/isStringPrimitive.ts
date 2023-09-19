/**
 * Returns `true` if the value is a string primitive.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isStringPrimitive(''); // => true
 * isStringPrimitive('a'); // => true
 * isStringPrimitive(0); // => false
 * ```
 */
const isStringPrimitive = (value: unknown): value is string =>
  typeof value === 'string';

export default isStringPrimitive;
