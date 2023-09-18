import { patch } from '../../.internal/utils/patch';
import strictValues from '../../ObjectConstructor/strictValues';

import type { StrictValues } from '../../ObjectConstructor/strictValues';

declare global {
  interface ObjectConstructor {
    /**
     * Returns an array of values of the enumerable properties of an object (using `Object.values`, but with stricter TypeScript typings).
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     *
     * @example
     * ```typescript
     * const obj = { a: 1, b: 2, c: 3, 5: 42, [Symbol()]: 'symbol' };
     * Object.strictValues(obj); // => [42, 1, 2, 3]
     * const values = Object.strictValues(obj); // values :: number[]
     * ```
     *
     * @see {@link Object.values}
     */
    strictValues<T extends object>(o: T): StrictValues<T>;
  }
}

patch(Object).withStatic({ strictValues });
