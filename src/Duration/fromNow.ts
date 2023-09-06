import after from './after';

/**
 * Returns the `Date` after the current `Date` by the `Duration`.
 * @param duration The `Duration` to get the `Date` after the current `Date` by.
 *
 * @example
 * ```typescript
 * new Date(); // => 2023-09-01T00:00:00.000Z
 * fromNow(years(2)); // => 2025-09-01T00:00:00.000Z
 * fromNow(years(2) + months(3)); // => 2025-12-01T00:00:00.000Z
 * ```
 */
const fromNow = (duration: bigint): Date => after(duration, new Date());

export default fromNow;
