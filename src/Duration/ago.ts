import before from './before';

/**
 * Returns the `Date` before the current `Date` by the `Duration`.
 * @param duration The `Duration` to get the `Date` before the current `Date` by.
 *
 * @example
 * ```typescript
 * new Date(); // => 2023-09-01T00:00:00.000Z
 * ago(years(2)); // => 2021-09-01T00:00:00.000Z
 * ago(years(2) + months(3)); // => 2021-06-01T00:00:00.000Z
 * ```
 */
const ago = (duration: bigint): Date => before(duration, new Date());

export default ago;
