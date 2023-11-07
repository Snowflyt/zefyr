import cloneDeep from '../../global/cloneDeep';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * Returns a deep clone of value.
   *
   * This method is like `clone` except that it recursively clones value.
   *
   * @param value The value to recursively clone.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1 }, { b: 2 }];
   * const deep = cloneDeep(objs);
   * deep[0] === objs[0]; // => false
   * ```
   *
   * @see {@link clone}
   */
  function cloneDeep<T>(value: T): T;
}

patch(globalThis).withStatic({ cloneDeep });
