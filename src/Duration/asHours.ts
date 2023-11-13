import asSeconds from './asSeconds';

import { SECONDS_PER_HOUR } from '.';

/**
 * Returns the total number of hours of the `Duration`.
 * @param duration The `Duration` to get the total number of hours of.
 *
 * @example
 * ```typescript
 * asHours(hours(2)); // => 2
 * asHours(hours(2) + minutes(3)); // => 2.05
 * ```
 */
const asHours = (duration: bigint): number => asSeconds(duration) / SECONDS_PER_HOUR;

export default asHours;
