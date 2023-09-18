import { patch } from '../../.internal/utils/patch';
import size from '../../ObjectConstructor/size';

import type { Size } from '../../ObjectConstructor/size';

declare global {
  interface ObjectConstructor {
    /**
     * Returns the number of enumerable properties and methods of the object or the `length` property of the object if it is an array-like object.
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     *
     * @example
     * ```typescript
     * Object.size({ a: 1, b: 2, c: 3 }); // => 3
     * Object.size({ length: 3 }); // => 3
     * Object.size(new Map([['a', 1], ['b', 2], ['c', 3]])); // => 3
     * Object.size(new Set([1, 2, 3, 4])); // => 4
     * ```
     */
    size<const O extends object>(o: O): Size<O>;
  }
}

patch(Object).withStatic({ size });
