/**
 * Returns an array of bits representing the number, from least significant to most significant.
 * @param n The number to get the bits of.
 *
 * @example
 * ```typescript
 * bits(0b1010); // => [0, 1, 0, 1]
 * bits(0b1010)[0]; // => 0
 * ```
 */
const bits = (n: number): number[] => n.toString(2).split('').reverse().map(Number);

export default bits;
