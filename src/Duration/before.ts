import {
  subDays,
  subHours,
  subMilliseconds,
  subMinutes,
  subMonths,
  subSeconds,
  subWeeks,
  subYears,
} from 'date-fns';

/**
 * Returns the `Date` before the given `date` by the `Duration`.
 * @param duration The `Duration` to get the `Date` before the given `date` by.
 * @param date The `Date` to get the `Date` before by the `Duration`.
 *
 * @example
 * ```typescript
 * const date = new Date();
 * console.log(date); // 2023-09-01T00:00:00.000Z
 * before(years(2), date); // => 2021-09-01T00:00:00.000Z
 * before(years(2) + months(3), date); // => 2021-06-01T00:00:00.000Z
 * ```
 */
const before = (duration: bigint, date: number | Date): Date => {
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
  if (years) result = subYears(result, years);
  if (months) result = subMonths(result, months);
  if (weeks) result = subWeeks(result, weeks);
  if (days) result = subDays(result, days);
  if (hours) result = subHours(result, hours);
  if (minutes) result = subMinutes(result, minutes);
  if (seconds) result = subSeconds(result, seconds);
  if (milliseconds) result = subMilliseconds(result, milliseconds);
  return result;
};

export default before;
