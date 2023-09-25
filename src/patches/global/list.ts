import list from '../../global/list';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * Returns a tuple of the given elements.
   *
   * It is the same as `[...elements] as const`, but with a more readable syntax.
   * @param elements The elements to return.
   *
   * @example
   * ```typescript
   * list(1, 2, 3); // => [1, 2, 3]
   * const as = list('a', 'b', 'c'); // as :: readonly ['a', 'b', 'c']
   * ```
   */
  function list<const AS extends readonly unknown[]>(...elements: AS): AS;
}

patch(globalThis).withStatic({ list });
