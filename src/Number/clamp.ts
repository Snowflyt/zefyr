/**
 * Return `min` if the number is less than `min`, `max` if the number is greater than `max`, or the number itself if it is neither.
 * @param n The number to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 *
 * @example
 * ```typescript
 * clamp(5, 0, 10); // => 5
 * clamp(15, 0, 10); // => 10
 * clamp(-5, 0, 10); // => 0
 * ```
 */
const clamp = (n: number, min: number, max: number): number => Math.min(Math.max(n, min), max);

export default clamp;
