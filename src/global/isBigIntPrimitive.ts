/**
 * Returns `true` if the value is a bigint primitive.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isBigIntPrimitive(0n); // => true
 * isBigIntPrimitive(1n); // => true
 * isBigIntPrimitive(''); // => false
 * ```
 */
const isBigIntPrimitive = (value: unknown): value is bigint => typeof value === 'bigint';

export default isBigIntPrimitive;
