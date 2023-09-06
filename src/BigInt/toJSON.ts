/**
 * Returns the string representation of the BigInt.
 *
 * It is an alias of `BigInt#toString`.
 *
 * @example
 * ```typescript
 * console.log(toJSON(10n)); // => "10"
 * ```
 */
const toJSON = (n: bigint): string => n.toString();

export default toJSON;
