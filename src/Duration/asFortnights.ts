import asSeconds from './asSeconds';

import { SECONDS_PER_WEEK } from '.';

/**
 * Returns the total number of fortnights (2 weeks) of the `Duration`.
 * @param duration The `Duration` to get the total number of fortnights of.
 *
 * @example
 * ```typescript
 * asFortnights(fortnights(2)); // => 2
 * asFortnights(fortnights(2) + days(3)); // => 2.2142857142857144
 * ```
 */
const asFortnights = (duration: bigint): number => asSeconds(duration) / SECONDS_PER_WEEK / 2;

export default asFortnights;
