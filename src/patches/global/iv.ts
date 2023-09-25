import iv from '../../global/iv';
import { patch } from '../../internal/utils/patch';

import type { MethodKey } from '../../global/iv';

declare global {
  /**
   * Returns a function that when given a value invokes the specified method. `iv` is short for "invoke".
   * @param name The method to get.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: () => 3 };
   * const objs = [{ a: 1, b: 2, c: () => 3 }, { a: 4, b: 5, c: () => 6 }];
   * objs.map(iv('c')); // => [3, 6]
   * [' a', ' b', ' c'].map(iv('trim')); // => ['a', 'b', 'c']
   * iv<typeof obj, 'c'>('c')(obj); // => 3
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - TODO: Fix this
  function iv<const T, const P extends MethodKey<T>>(
    name: P,
    // @ts-expect-error - TS doesn't know T[P] is a function
  ): (x: T) => ReturnType<T[P]>;
}

patch(globalThis).withStatic({ iv });
