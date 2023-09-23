import { patch } from '../../.internal/utils/patch';
import invoke from '../../global/invoke';

import type { MethodKey } from '../../global/invoke';

declare global {
  /**
   * Returns a function that when given a value returns the value of the specified property.
   * @param name The method to get.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: () => 3 };
   * const objs = [{ a: 1, b: 2, c: () => 3 }, { a: 4, b: 5, c: () => 6 }];
   * objs.map(method('c')); // => [3, 6]
   * [' a', ' b', ' c'].map(method('trim')); // => ['a', 'b', 'c']
   * method<typeof obj, 'c'>('c')(obj); // => 3
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - TODO: Fix this
  function invoke<const T, const P extends MethodKey<T>>(
    name: P,
    // @ts-expect-error - TS doesn't know T[P] is a function
  ): (x: T) => ReturnType<T[P]>;
}

patch(globalThis).withStatic({ invoke });
