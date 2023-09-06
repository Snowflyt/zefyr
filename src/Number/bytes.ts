/**
 * Returns the corresponding size represented in bytes.
 * It simply returns the number itself.
 * This exists only for consistency with other size units.
 * @param n The number to get the bytes of.
 *
 * @example
 * ```typescript
 * bytes(5); // => 5
 * ```
 */
const bytes = (n: number): number => n;

export default bytes;
