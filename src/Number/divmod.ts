/**
 * Returns the quotient and remainder of the number divided by the divisor.
 * @param n The number to divmod.
 *
 * @example
 * ```typescript
 * divmod(11); // => [2, 3]
 * divmod(-11); // => [-2, -3]
 * ```
 *
 * @see {@link Math.trunc}
 */
const divmod = (n: number, divisor: number): [number, number] => [
  Math.trunc(n / divisor),
  n % divisor,
];

export default divmod;
