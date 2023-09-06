import {
  SECONDS_PER_DAY,
  SECONDS_PER_HOUR,
  SECONDS_PER_MINUTE,
  SECONDS_PER_MONTH,
  SECONDS_PER_WEEK,
  SECONDS_PER_YEAR,
} from '.';

/**
 * Returns the total number of seconds of the `Duration`.
 * @param duration The `Duration` to get the total number of seconds of.
 *
 * @example
 * ```typescript
 * asSeconds(seconds(2)); // => 2
 * asSeconds(seconds(2) + milliseconds(3)); // => 2.003
 * ```
 */
const asSeconds = (duration: bigint): number => {
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

  return (
    years * SECONDS_PER_YEAR +
    months * SECONDS_PER_MONTH +
    weeks * SECONDS_PER_WEEK +
    days * SECONDS_PER_DAY +
    hours * SECONDS_PER_HOUR +
    minutes * SECONDS_PER_MINUTE +
    seconds +
    milliseconds / 1000
  );
};

export default asSeconds;
