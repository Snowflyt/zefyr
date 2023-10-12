import takeUntil from '../../Array/takeUntil';
import { patch } from '../../internal/utils/patch';

import type { Ary } from '../../internal/types/tools';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Takes elements from the array until the predicate returns `true`.
     * @param pred The predicate function.
     *
     * @example
     * ```typescript
     * [1, 2, 3, 4, 5].takeUntil((x) => x === 3); // => [1, 2]
     * [1, 2, 3, 4, 5].takeUntil((x) => x === 10); // => [1, 2, 3, 4, 5]
     * ```
     */
    takeUntil: <AS extends readonly unknown[]>(
      this: AS,
      pred: (value: AS[number], index: number, array: AS) => boolean,
    ) => Ary.Mutate<AS, AS[number]>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Takes elements from the array until the predicate returns `true`.
     * @param pred The predicate function.
     *
     * @example
     * ```typescript
     * [1, 2, 3, 4, 5].takeUntil((x) => x === 3); // => [1, 2]
     * [1, 2, 3, 4, 5].takeUntil((x) => x === 10); // => [1, 2, 3, 4, 5]
     * ```
     */
    takeUntil: <AS extends readonly unknown[]>(
      this: AS,
      pred: (value: AS[number], index: number, array: AS) => boolean,
    ) => Ary.Mutate<AS, AS[number]>;
  }
}

patch(Array).with({ takeUntil });
