import strictKeys from '../../ObjectConstructor/strictKeys';
import { patch } from '../../utils/patch';

import type { StrictKeys } from '../../ObjectConstructor/strictKeys';

declare global {
  interface ObjectConstructor {
    /**
     * Returns the names of the enumerable string properties and methods of an object (using `Object.keys`, but with stricter TypeScript typings).
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     *
     * @example
     * ```typescript
     * const obj = { a: 1, b: 2, c: 3, 5: 42, [Symbol()]: 'symbol' };
     * Object.strictKeys(obj); // => ['5', 'a', 'b', 'c']
     * const keys = Object.strictKeys(obj); // keys :: ('5' | 'a' | 'b' | 'c')[]
     * ```
     *
     * @example
     * ```typescript
     * const obj = { a: 1, b: 2, c: 3, 5: 42, [Symbol()]: 'symbol' };
     * for (const key of Object.strictKeys(obj)) {
     *   console.log(obj[key]); // No type error
     * }
     * ```
     *
     * @see {@link Object.keys}
     */
    strictKeys<T extends object>(o: T): StrictKeys<T>;
  }
}

patch(Object).withStatic({ strictKeys });
