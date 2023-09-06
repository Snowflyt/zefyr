import asSeconds from './asSeconds';

/**
 * Returns the total number of milliseconds of the `Duration`.
 * @param duration The `Duration` to get the total number of milliseconds of.
 *
 * @example
 * ```typescript
 * asMilliseconds(milliseconds(2)); // => 2
 * asMilliseconds(seconds(2) + milliseconds(3)); // => 2003
 * ```
 */
const asMilliseconds = (duration: bigint): number => asSeconds(duration) * 1000;

export default asMilliseconds;
