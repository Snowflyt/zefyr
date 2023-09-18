import { patch } from '../../.internal/utils/patch';
import equals from '../../global/equals';

declare global {
  /**
   * Returns `true` if its arguments are equivalent (recursively). Handles cyclical data structures.
   *
   * Dispatches symmetrically to the `equals` methods of both arguments, if present.
   * @param a The first item to compare.
   * @param b The second item to compare.
   *
   * @example
   * ```typescript
   * equals(1, 1); //=> true
   * equals(1, '1'); //=> false
   * equals([1, 2, 3], [1, 2, 3]); //=> true
   * equals({ a: [1], b: { c: 'd' } }, { a: [1], b: { c: 'd' } }); //=> true
   *
   * const a = {};
   * a.v = a;
   * const b = {};
   * b.v = b;
   * equals(a, b); //=> true
   * ```
   */
  function equals<T>(a: T, b: T): boolean;
}

patch(globalThis).withStatic({ equals });
