const slice = (n: bigint, start: bigint, end: bigint) =>
  (n & (((1n << (end - start)) - 1n) << start)) >> start;

/**
 * Returns parts of the `Duration` represented as an object.
 * @param duration The `Duration` to get the parts of.
 *
 * @example
 * ```typescript
 * parts(years(2)); // => { years: 2, months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
 * parts(years(2) + months(3)); // => { years: 2, months: 3, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }
 * ```
 */
const parts = (
  duration: bigint,
): {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
} => {
  const milliseconds = Number(slice(duration, 53n * 0n, 53n * 1n));
  const seconds = Number(slice(duration, 53n * 1n, 53n * 2n));
  const minutes = Number(slice(duration, 53n * 2n, 53n * 3n));
  const hours = Number(slice(duration, 53n * 3n, 53n * 4n));
  const days = Number(slice(duration, 53n * 4n, 53n * 5n));
  const weeks = Number(slice(duration, 53n * 5n, 53n * 6n));
  const months = Number(slice(duration, 53n * 6n, 53n * 7n));
  const years = Number(slice(duration, 53n * 7n, 53n * 8n));
  return {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};

export default parts;
