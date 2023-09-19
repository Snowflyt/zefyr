/**
 * Returns `true` if the value is a boolean primitive.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isBooleanPrimitive(true); // => true
 * isBooleanPrimitive(false); // => true
 * isBooleanPrimitive(0); // => false
 * ```
 */
const isBooleanPrimitive = (value: unknown): value is boolean =>
  value === true || value === false;

export default isBooleanPrimitive;
