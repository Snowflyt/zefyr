import median from '../../Array/median';
import { patch } from '../../utils/patch';

import type { Median } from '../../Array/median';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Returns the median of all elements in the array (only for number or bigint arrays).
     *
     * If the array has an even number of elements, the median is the average of the two middle elements.
     *
     * @throws {TypeError} If the array is empty or contains non-numbers or mixed numbers and bigints.
     *
     * @example
     * ```typescript
     * const arr = [2, 1, 3.5, 3, 4];
     * arr.median(); // => 3
     * ```
     */
    median(): Median<this>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Returns the median of all elements in the array (only for number or bigint arrays).
     *
     * If the array has an even number of elements, the median is the average of the two middle elements.
     *
     * @throws {TypeError} If the array is empty or contains non-numbers or mixed numbers and bigints.
     *
     * @example
     * ```typescript
     * const arr = [2, 1, 3.5, 3, 4];
     * arr.median(); // => 3
     * ```
     */
    median(): Median<this>;
  }
}

patch(Array).with({ median });
