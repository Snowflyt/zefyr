import { createCallableArray } from '../CallableArray';

import type { CallableArray } from '../CallableArray';

/**
 * Returns the number of digits in the number.
 * @param n The number to get the digits of.
 * @param radix The base to use for the calculation. Defaults to 10.
 *
 * @example
 * ```typescript
 * digits(12345); // => CallableArray(5, 4, 3, 2, 1)
 * digits(12345)[1]; // => 4
 * digits(12345)(); // => [5, 4, 3, 2, 1]
 * digits(12345)(10); // => [5, 4, 3, 2, 1]
 * digits(12345)(7); // => [4, 6, 6, 0, 5]
 * digits(12345)(100); // => [45, 23, 1]
 * ```
 */
const digits = (
  n: number,
): CallableArray<number, (radix?: number) => number[]> => {
  const digits = (radix: number = 10): number[] => {
    const result: number[] = [];
    let num = n;
    while (num) {
      result.push(num % radix);
      num = Math.trunc(num / radix);
    }
    return result;
  };

  return createCallableArray(digits(), digits) as never;
};

export default digits;
