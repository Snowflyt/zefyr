import filter from '../../ObjectConstructor/filter';
import { patch } from '../../internal/utils/patch';

import type { StrictEntries } from '../../ObjectConstructor/entriesS';
import type { StrictKeys } from '../../ObjectConstructor/keysS';

declare global {
  interface ObjectConstructor {
    /**
     * Calls a defined callback function on each enumerable key/value pair of an object, and returns an object that contains results meeting the condition specified in the callback function.
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     * @param predicate A function that accepts up to three arguments. The filter function calls the predicate function one time for each key/value pair in the object.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     *
     * @example
     * ```typescript
     * const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
     * Object.filter(obj, ([key, value]) => key === 'a' || value === 42); // => { 5: 42, a: 1 }
     * const filtered = Object.filter(obj, ([key, value]) => key === 'a' || value === 42); // filtered :: { 5?: number | undefined, a?: number | undefined, b?: number | undefined }
     * ```
     */
    filter<const O extends object>(
      o: O,
      predicate: (entry: StrictEntries<O>[number], index: number, object: O) => boolean,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      thisArg?: any,
    ): {
      // @ts-expect-error - `P` should be keyof `O` but TS cannot infer it
      [P in StrictKeys<O>[number]]?: O[P];
    };
  }
}

patch(Object).withStatic({ filter });
