import { patch } from '../../.internal/utils/patch';
import map from '../../ObjectConstructor/map';

import type { StrictEntries } from '../../ObjectConstructor/entriesS';

declare global {
  interface ObjectConstructor {
    /**
     * Calls a defined callback function on each key/value pair of an object, and returns an object that contains the results.
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each key/value pair in the object.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     *
     * @example
     * ```typescript
     * const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
     * Object.map(obj, ([key, value]) => [`${key}_`, value * 2]); // => { '5_': 84, 'a_': 2, 'b_': 4 }
     * const mapped = Object.map(obj, ([key, value]) => [`${key}_`, value * 2]); // mapped :: { '5_': number, 'a_': number, 'b_': number }
     * ```
     */
    map<const O extends object, const R extends readonly [string, unknown]>(
      o: O,
      callbackfn: (
        entry: StrictEntries<O>[number],
        index: number,
        object: O,
      ) => R,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      thisArg?: any,
    ): { [P in R[0]]: R[1] };
  }
}

patch(Object).withStatic({ map });
