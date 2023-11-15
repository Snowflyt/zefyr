import enumerate from '../../global/enumerate';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * Enumerate an iterable, yielding tuples of the form `[index, item]`.
   * @param iterable The iterable to enumerate.
   *
   * @example
   * ```typescript
   * for (const [i, item] of enumerate(['a', 'b', 'c'])) {
   *   console.log(i, item);
   *   // 0 'a'
   *   // 1 'b'
   *   // 2 'c'
   * }
   * ```
   */
  function enumerate<T>(iterable: Iterable<T>): Iterable<[number, T]>;
}

patch(globalThis).withStatic({ enumerate });
