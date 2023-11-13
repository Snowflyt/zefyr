import { format as formatDate } from 'date-fns';

/**
 * Return the formatted date string in the given format. (using `date-fns/format`)
 *
 * @example
 * ```typescript
 * format(new Date(), 'yyyy-MM-dd HH:mm:ss'); // => 2023-09-01 12:34:56
 * ```
 *
 * @see {@link https://date-fns.org/v2.30.0/docs/format}
 */
const format = (date: Date, ...args: Parameters<Date['format']>) => formatDate(date, ...args);

export default format;
