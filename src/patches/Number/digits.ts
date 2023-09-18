import { patch } from '../../.internal/utils/patch';
import digits from '../../Number/digits';

import type { CallableArray } from '../../CallableArray';

declare global {
  interface Number {
    /**
     * Returns the number of digits in the number.
     * @param radix The base to use for the calculation. Defaults to 10.
     *
     * @example
     * ```typescript
     * (12345).digits; // => CallableArray(5, 4, 3, 2, 1)
     * (12345).digits[1]; // => 4
     * (12345).digits(); // => [5, 4, 3, 2, 1]
     * (12345).digits(10); // => [5, 4, 3, 2, 1]
     * (12345).digits(7); // => [4, 6, 6, 0, 5]
     * (12345).digits(100); // => [45, 23, 1]
     * ```
     */
    readonly digits: CallableArray<number, (radix?: number) => number[]>;
  }
}

patch(Number).withGetter({ digits });
