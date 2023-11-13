import asSeconds from './asSeconds';

import { SECONDS_PER_DAY } from '.';

/**
 * Returns the total number of days of the `Duration`.
 * @param duration The `Duration` to get the total number of days of.
 *
 * @example
 * ```typescript
 * asDays(days(2)); // => 2
 * asDays(days(2) + hours(3)); // => 2.125
 * ```
 */
const asDays = (duration: bigint): number => asSeconds(duration) / SECONDS_PER_DAY;

export default asDays;
