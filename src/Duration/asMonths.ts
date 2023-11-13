import asSeconds from './asSeconds';

import { SECONDS_PER_MONTH } from '.';

/**
 * Returns the total number of months of the `Duration`.
 * @param duration The `Duration` to get the total number of months of.
 *
 * @example
 * ```typescript
 * asMonths(months(2)); // => 2
 * asMonths(months(2) + weeks(3)); // => 2.689952565761104
 * ```
 */
const asMonths = (duration: bigint): number => asSeconds(duration) / SECONDS_PER_MONTH;

export default asMonths;
