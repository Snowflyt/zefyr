import prop from '../../global/prop';
import { patch } from '../../internal/utils/patch';

import type { Prop } from '../../global/prop';

declare global {
  /**
   * Returns a function that when given an object returns the value of the specified property.
   *
   * The function also has a number of extensions that can be used to compare the value of the property.
   * @param prop The property to get.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2 };
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.map(prop('a')); // => [1, 3]
   * prop<typeof obj, 'a'>('a')(obj); // => 1
   * ```
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').eq(1)); // => [{ a: 1, b: 2 }]
   * ```
   */
  function prop<const T, P extends unknown extends T ? PropertyKey : keyof T>(
    prop: P,
  ): Prop<T, P>;
}

patch(globalThis).withStatic({ prop });
