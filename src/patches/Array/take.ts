import take from '../../Array/take';
import { patch } from '../../internal/utils/patch';

import type {
  Ary,
  IfpList,
  List,
  Num,
  Yield1$,
} from '../../internal/types/tools';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Takes the first `count` elements from the array.
     * @param count - The number of elements to take.
     *
     * @example
     * ```typescript
     * [1, 2, 3, 4, 5].take(3); // => [1, 2, 3]
     * [1, 2, 3, 4, 5].take(0); // => []
     * [1, 2, 3, 4, 5].take(10); // => [1, 2, 3, 4, 5]
     * ```
     */
    take: <AS extends readonly unknown[], const N extends number>(
      this: AS,
      count: N,
    ) => IfpList<
      AS,
      Num.IfNat<N, List.Take$<N>, Ary.Mutate$<AS[number]>>,
      Yield1$<AS>
    >;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Takes the first `count` elements from the array.
     * @param count - The number of elements to take.
     *
     * @example
     * ```typescript
     * [1, 2, 3, 4, 5].take(3); // => [1, 2, 3]
     * [1, 2, 3, 4, 5].take(0); // => []
     * [1, 2, 3, 4, 5].take(10); // => [1, 2, 3, 4, 5]
     * ```
     */
    take: <AS extends readonly unknown[], const N extends number>(
      this: AS,
      count: N,
    ) => IfpList<
      AS,
      Num.IfNat<N, List.Take$<N>, Ary.Mutate$<AS[number]>>,
      Yield1$<AS>
    >;
  }
}

patch(Array).with({ take });
