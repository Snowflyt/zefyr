import asSeconds from './asSeconds';

import { SECONDS_PER_WEEK } from '.';

/**
 * Returns the total number of weeks of the `Duration`.
 * @param duration The `Duration` to get the total number of weeks of.
 *
 * @example
 * ```typescript
 * asWeeks(weeks(2)); // => 2
 * asWeeks(weeks(2) + days(3)); // => 2.4285714285714284
 * ```
 */
const asWeeks = (duration: bigint): number =>
  asSeconds(duration) / SECONDS_PER_WEEK;

export default asWeeks;
