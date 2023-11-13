import drop from '../../Array/drop';
import { patch } from '../../internal/utils/patch';

import type { Ary, IfpList, List, Num, Yield1$ } from '../../internal/types/tools';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Drops the first `count` elements from the array.
     * @param count - The number of elements to drop.
     *
     * @example
     * ```typescript
     * [1, 2, 3, 4, 5].drop(3); // => [4, 5]
     * [1, 2, 3, 4, 5].drop(0); // => [1, 2, 3, 4, 5]
     * [1, 2, 3, 4, 5].drop(10); // => []
     * ```
     */
    drop: <const AS extends readonly unknown[], const N extends number>(
      this: AS,
      count: N,
    ) => IfpList<AS, Num.IfNat<N, List.Drop$<N>, Ary.Mutate$<AS[number]>>, Yield1$<AS>>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Drops the first `count` elements from the array.
     * @param count - The number of elements to drop.
     *
     * @example
     * ```typescript
     * [1, 2, 3, 4, 5].drop(3); // => [4, 5]
     * [1, 2, 3, 4, 5].drop(0); // => [1, 2, 3, 4, 5]
     * [1, 2, 3, 4, 5].drop(10); // => []
     * ```
     */
    drop: <const AS extends readonly unknown[], const N extends number>(
      this: AS,
      count: N,
    ) => IfpList<AS, Num.IfNat<N, List.Drop$<N>, Ary.Mutate$<AS[number]>>, Yield1$<AS>>;
  }
}

patch(Array).with({ drop });
