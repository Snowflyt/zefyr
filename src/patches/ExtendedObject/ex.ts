import { ex } from '../../ExtendedObject';
import { patch } from '../../internal/utils/patch';

import type { ExtendedObject } from '../../ExtendedObject';

declare global {
  /**
   * Creates an object with additional methods.
   * @param o The object to extend.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: 3 };
   * ex(obj).filter(([k, v]) => v % 2 === 0).mapKeys((k) => k.toUpperCase()); // => { B: 2 }
   * ex(obj).omit('a', 'b').size(); // => 1
   * ```
   */
  function ex<const O extends object>(o: O): ExtendedObject<O>;
}

patch(globalThis).withStatic({ ex });
