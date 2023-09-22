import { patch } from '../../.internal/utils/patch';
import reduce from '../../ObjectConstructor/reduce';

import type { StrictEntries } from '../../ObjectConstructor/entriesS';
import type { StrictValues } from '../../ObjectConstructor/valuesS';

declare global {
  interface ObjectConstructor {
    /**
     * Calls a defined callback function on each enumerable key/value pair of an object. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     * @param callbackfn A function that accepts up to four arguments. The reduce function calls the callbackfn function one time for each key/value pair in the object.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an object value.
     *
     * @example
     * ```typescript
     * const obj = { a: 1, b: 2, c: 3 };
     * Object.reduce(obj, (acc, [key, value]) => acc + value, 0); // => 6
     * ```
     */
    reduce<const O extends object>(
      o: O,
      callbackfn: (
        previousValue: StrictValues<O>[number],
        currentEntry: StrictEntries<O>[number],
        currentIndex: number,
        object: O,
      ) => StrictValues<O>[number],
    ): StrictValues<O>[number];
    reduce<const O extends object, R>(
      o: O,
      callbackfn: (
        previousValue: R,
        currentEntry: StrictEntries<O>[number],
        currentIndex: number,
        object: O,
      ) => R,
      initialValue: R,
    ): R;
  }
}

patch(Object).withStatic({ reduce });
