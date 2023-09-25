import mapValues from '../../ObjectConstructor/mapValues';
import { patch } from '../../internal/utils/patch';

import type { StrictKeys } from '../../ObjectConstructor/keysS';
import type { StrictValues } from '../../ObjectConstructor/valuesS';

declare global {
  interface ObjectConstructor {
    /**
     * Calls a defined callback function on each enumerable value of an object, and returns an object that contains the results.
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     * @param callbackfn A function that accepts up to three arguments. The mapValues function calls the callbackfn function one time for each value in the object.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     *
     * @example
     * ```typescript
     * const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
     * Object.mapValues(obj, (value) => value * 2); // => { '5': 84, 'a': 2, 'b': 4 }
     * const mapped = Object.mapValues(obj, (value) => value * 2); // mapped :: { '5': number, 'a': number, 'b': number }
     * ```
     */
    mapValues<const O extends object, const R>(
      o: O,
      callbackfn: (
        value: StrictValues<O>[number],
        index: number,
        object: O,
      ) => R,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      thisArg?: any,
    ): { [P in StrictKeys<O>[number]]: R };
  }
}

patch(Object).withStatic({ mapValues });
