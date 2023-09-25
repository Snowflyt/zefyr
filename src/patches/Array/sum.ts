import sum from '../../Array/sum';
import { patch } from '../../internal/utils/patch';

import type { Sum } from '../../Array/sum';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Returns the sum of all elements in the array (only for number or bigint arrays).
     *
     * **Do not** use it with an array of bigint with zero elements, as it will return `0` instead of `0n`.
     *
     * @throws {TypeError} If the array contains non-numbers or mixed numbers and bigints.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * arr.sum(); // => 6
     * ```
     */
    sum(): Sum<this>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Returns the sum of all elements in the array (only for number or bigint arrays).
     *
     * **Do not** use it with an array of bigint with zero elements, as it will return `0` instead of `0n`.
     *
     * @throws {TypeError} If the array contains non-numbers or mixed numbers and bigints.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * arr.sum(); // => 6
     * ```
     */
    sum(): Sum<this>;
  }
}

patch(Array).with({ sum });
