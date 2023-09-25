import mean from '../../Array/mean';
import { patch } from '../../internal/utils/patch';

import type { Mean } from '../../Array/mean';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Returns the mean of all elements in the array (only for number or bigint arrays).
     *
     * **Do not** use it with an array of bigint with zero elements, as it will return `0` instead of `0n`.
     *
     * @throws {TypeError} If the array contains non-numbers or mixed numbers and bigints.
     *
     * @example
     * ```typescript
     * const arr = [2, 1, 3.5, 3, 4];
     * arr.mean(); // => 2.7
     * ```
     */
    mean(): Mean<this>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Returns the mean of all elements in the array (only for number or bigint arrays).
     *
     * **Do not** use it with an array of bigint with zero elements, as it will return `0` instead of `0n`.
     *
     * @throws {TypeError} If the array contains non-numbers or mixed numbers and bigints.
     *
     * @example
     * ```typescript
     * const arr = [2, 1, 3.5, 3, 4];
     * arr.mean(); // => 2.7
     * ```
     */
    mean(): Mean<this>;
  }
}

patch(Array).with({ mean });
