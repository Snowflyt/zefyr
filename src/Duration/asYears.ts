import asSeconds from './asSeconds';

import { SECONDS_PER_YEAR } from '.';

/**
 * Returns the total number of years of the `Duration`.
 * @param duration The `Duration` to get the total number of years of.
 *
 * @example
 * ```typescript
 * asYears(years(2)); // => 2
 * asYears(years(2) + months(3)); // => 2.25
 * ```
 */
const asYears = (duration: bigint): number => asSeconds(duration) / SECONDS_PER_YEAR;

export default asYears;
