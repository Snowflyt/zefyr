/**
 * Returns the character represented by the Unicode value of the number (using `String.fromCharCode`).
 * @param n The number to get the character of.
 *
 * @example
 * ```typescript
 * toChar(65); // => 'A'
 * toChar(97); // => 'a'
 * ```
 *
 * @see {@link String.fromCharCode}
 */
const toChar = (n: number): string => String.fromCharCode(n);

export default toChar;
