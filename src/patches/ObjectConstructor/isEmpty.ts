import isEmpty from '../../ObjectConstructor/isEmpty';
import { patch } from '../../internal/utils/patch';

declare global {
  interface ObjectConstructor {
    /**
     * Returns `true` if the value is an empty object. An object is considered empty unless it’s an arguments object, array, or
     * jQuery-like collection with a length greater than 0 or an object with own enumerable properties (using _.isEmpty).
     * @param o — The value to check.
     *
     * @example
     * ```typescript
     * isEmpty({}); // => true
     * isEmpty({ a: 1 }); // => false
     * isEmpty([1, 2, 3]); // => false
     * isEmpty([]); // => true
     * isEmpty(new Map()); // => true
     * isEmpty(new Set()); // => true
     * ```
     *
     * @see {@link _.isEmpty}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isEmpty(o: Map<any, any> | Set<any> | ArrayLike<any>): boolean;
    isEmpty(o: object): boolean;
  }
}

patch(Object).withStatic({ isEmpty });
