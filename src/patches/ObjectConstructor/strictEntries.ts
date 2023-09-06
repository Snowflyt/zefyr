import strictEntries from '../../ObjectConstructor/strictEntries';
import { patch } from '../../utils/patch';

import type { StrictEntries } from '../../ObjectConstructor/strictEntries';

declare global {
  interface ObjectConstructor {
    /**
     * Returns an array of key/values of the enumerable properties of an object (using `Object.entries`, but with stricter TypeScript typings).
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     *
     * @example
     * ```typescript
     * const obj = { a: 1, b: 2, c: true, 5: 42, [Symbol()]: 'symbol' };
     * Object.strictEntries(obj); // => [['5', 42], ['a', 1], ['b', 2], ['c', true]]
     * const entries = Object.strictEntries(obj); // entries :: (['5', number] | ['a', number] | ['b', number] | ['c', boolean])[]
     * ```
     *
     * @see {@link Object.entries}
     */
    strictEntries<T extends object>(o: T): StrictEntries<T>;
  }
}

patch(Object).withStatic({ strictEntries });
