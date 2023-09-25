import keysS from '../../ObjectConstructor/keysS';
import { patch } from '../../internal/utils/patch';

import type { StrictKeys } from '../../ObjectConstructor/keysS';

declare global {
  interface ObjectConstructor {
    /**
     * Returns the names of the enumerable string properties and methods of an object (using `Object.keys`, but with stricter TypeScript typings).
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     *
     * @example
     * ```typescript
     * const obj = { a: 1, b: 2, c: 3, 5: 42, [Symbol()]: 'symbol' };
     * Object.keysS(obj); // => ['5', 'a', 'b', 'c']
     * const keys = Object.strictKeys(obj); // keys :: ('5' | 'a' | 'b' | 'c')[]
     * ```
     *
     * @example
     * ```typescript
     * const obj = { a: 1, b: 2, c: 3, 5: 42, [Symbol()]: 'symbol' };
     * for (const key of Object.keysS(obj)) {
     *   console.log(obj[key]); // No type error
     * }
     * ```
     *
     * @see {@link Object.keys}
     */
    keysS<T extends object>(o: T): StrictKeys<T>;
  }
}

patch(Object).withStatic({ keysS });
