import format from '../../Date/format';
import { patch } from '../../utils/patch';

import type { format as formatDate } from 'date-fns';

declare global {
  interface Date {
    /**
     * Return the formatted date string in the given format. (using `date-fns/format`)
     *
     * @example
     * ```typescript
     * new Date().format('yyyy-MM-dd HH:mm:ss'); // => '2023-09-01 12:34:56'
     * ```
     *
     * @see {@link https://date-fns.org/v2.30.0/docs/format}
     */
    format(
      ...args: [
        format: Parameters<typeof formatDate>[1],
        options?: Parameters<typeof formatDate>[2],
      ]
    ): string;
  }
}

patch(Date).with({ format });
