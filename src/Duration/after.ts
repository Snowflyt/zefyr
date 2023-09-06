import {
  addDays,
  addHours,
  addMilliseconds,
  addMinutes,
  addMonths,
  addSeconds,
  addWeeks,
  addYears,
} from 'date-fns';

/**
 * Returns the `Date` after the given `date` by the `Duration`.
 * @param duration The `Duration` to get the `Date` after the given `date` by.
 * @param date The `Date` to get the `Date` after by the `Duration`.
 *
 * @example
 * ```typescript
 * const date = new Date();
 * console.log(date); // 2023-09-01T00:00:00.000Z
 * after(years(2), date); // => 2025-09-01T00:00:00.000Z
 * after(years(2) + months(3), date); // => 2025-12-01T00:00:00.000Z
 * ```
 */
const after = (duration: bigint, date: number | Date): Date => {
  const slice = (n: bigint, start: bigint, end: bigint): bigint =>
    (n & (((1n << (end - start)) - 1n) << start)) >> start;

  const milliseconds = Number(slice(duration, 53n * 0n, 53n * 1n));
  const seconds = Number(slice(duration, 53n * 1n, 53n * 2n));
  const minutes = Number(slice(duration, 53n * 2n, 53n * 3n));
  const hours = Number(slice(duration, 53n * 3n, 53n * 4n));
  const days = Number(slice(duration, 53n * 4n, 53n * 5n));
  const weeks = Number(slice(duration, 53n * 5n, 53n * 6n));
  const months = Number(slice(duration, 53n * 6n, 53n * 7n));
  const years = Number(slice(duration, 53n * 7n, 53n * 8n));

  let result = new Date(date);
  if (years) result = addYears(result, years);
  if (months) result = addMonths(result, months);
  if (weeks) result = addWeeks(result, weeks);
  if (days) result = addDays(result, days);
  if (hours) result = addHours(result, hours);
  if (minutes) result = addMinutes(result, minutes);
  if (seconds) result = addSeconds(result, seconds);
  if (milliseconds) result = addMilliseconds(result, milliseconds);
  return result;
};

export default after;
