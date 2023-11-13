import dropWhile from '../../Array/dropWhile';
import { patch } from '../../internal/utils/patch';

import type { Ary } from '../../internal/types/tools';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Drops elements from the array until the predicate returns `false`.
     * @param pred The predicate function.
     *
     * @example
     * ```typescript
     * [1, 2, 3, 4, 5].dropWhile((x) => x < 3); // => [3, 4, 5]
     * [1, 2, 3, 4, 5].dropWhile((x) => x > 0); // => [1, 2, 3, 4, 5]
     * ```
     */
    dropWhile: <AS extends readonly unknown[]>(
      this: AS,
      pred: (value: AS[number], index: number, array: AS) => boolean,
    ) => Ary.Mutate<AS, AS[number]>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Drops elements from the array until the predicate returns `false`.
     * @param pred The predicate function.
     *
     * @example
     * ```typescript
     * [1, 2, 3, 4, 5].dropWhile((x) => x < 3); // => [3, 4, 5]
     * [1, 2, 3, 4, 5].dropWhile((x) => x > 0); // => [1, 2, 3, 4, 5]
     * ```
     */
    dropWhile: <AS extends readonly unknown[]>(
      this: AS,
      pred: (value: AS[number], index: number, array: AS) => boolean,
    ) => Ary.Mutate<AS, AS[number]>;
  }
}

patch(Array).with({ dropWhile });
