import count from '../../Array/count';
import { patch } from '../../internal/utils/patch';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Returns the count of elements from the array that satisfy the predicate.
     * @param pred The predicate function.
     *
     * @example
     * ```typescript
     * [1, 2, 3, 3, 5].count((x) => x === 3); // => 2
     * [1, 2, 3, 3, 5].count((x) => x === 10); // => 0
     * ```
     */
    count: <AS extends readonly unknown[]>(
      this: AS,
      pred: (value: AS[number], index: number, array: AS) => boolean,
    ) => number;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Returns the count of elements from the array that satisfy the predicate.
     * @param pred The predicate function.
     *
     * @example
     * ```typescript
     * [1, 2, 3, 3, 5].count((x) => x === 3); // => 2
     * [1, 2, 3, 3, 5].count((x) => x === 10); // => 0
     * ```
     */
    count: <AS extends readonly unknown[]>(
      this: AS,
      pred: (value: AS[number], index: number, array: AS) => boolean,
    ) => number;
  }
}

patch(Array).with({ count });
