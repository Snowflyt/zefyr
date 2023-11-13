import asSeconds from './asSeconds';

import { SECONDS_PER_MINUTE } from '.';

/**
 * Returns the total number of minutes of the `Duration`.
 * @param duration The `Duration` to get the total number of minutes of.
 *
 * @example
 * ```typescript
 * asMinutes(minutes(2)); // => 2
 * asMinutes(minutes(2) + seconds(3)); // => 2.05
 * ```
 */
const asMinutes = (duration: bigint): number => asSeconds(duration) / SECONDS_PER_MINUTE;

export default asMinutes;
