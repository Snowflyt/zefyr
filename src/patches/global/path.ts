import { patch } from '../../.internal/utils/patch';
import path from '../../global/path';

import type { BasePath, BasePathArray, Path } from '../../global/path';

declare global {
  /**
   * Returns a function that when given an object returns the value of the specified path.
   *
   * The function also has a number of extensions that can be used to compare the value of the path.
   * @param path The path to get, can be either a string or an array of strings.
   *
   * @example
   * ```typescript
   * const obj = { a: { b: [1, 2, 3] } };
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }];
   * objs.map(path('a.b[0]')); // => [1, 4]
   * objs.map(path(['a', 'b', '0'])); // => [1, 4]
   * path<typeof obj, 'a.b[0]'>('a.b[0]')(obj); // => 1
   * path<typeof obj, ['a', 'b', '0']>(['a', 'b', '0'])(obj); // => 1
   * ```
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }];
   * objs.filter(path('a.b[0]').eq(1)); // => [{ a: { b: [1, 2, 3] } }]
   * objs.filter(path(['a', 'b', '0']).eq(1)); // => [{ a: { b: [1, 2, 3] } }]
   * ```
   */
  function path<
    const O extends object,
    const P extends object extends O
      ? string | readonly string[]
      : BasePath<O> | BasePathArray<O>,
  >(path: P): Path<O, P>;
}

patch(globalThis).withStatic({ path } as never);
