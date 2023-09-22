import type { StrictEntries } from './entriesS';
import type { StrictValues } from './valuesS';

/**
 * Calls a defined callback function on each enumerable key/value pair of an object. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 * @param callbackfn A function that accepts up to four arguments. The reduce function calls the callbackfn function one time for each key/value pair in the object.
 * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an object value.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 };
 * reduce(obj, (acc, [key, value]) => acc + value, 0); // => 6
 * ```
 */
const reduce: {
  <const O extends object>(
    o: O,
    callbackfn: (
      previousValue: StrictValues<O>[number],
      currentEntry: StrictEntries<O>[number],
      currentIndex: number,
      object: O,
    ) => StrictValues<O>[number],
  ): StrictValues<O>[number];
  <const O extends object, R>(
    o: O,
    callbackfn: (
      previousValue: R,
      currentEntry: StrictEntries<O>[number],
      currentIndex: number,
      object: O,
    ) => R,
    initialValue: R,
  ): R;
} = <const O extends object, R>(
  ...args:
    | [
        o: O,
        callbackfn: (
          previousValue: StrictValues<O>[number],
          currentEntry: StrictEntries<O>[number],
          currentIndex: number,
          object: O,
        ) => StrictValues<O>[number],
      ]
    | [
        o: O,
        callbackfn: (
          previousValue: R,
          currentEntry: StrictEntries<O>[number],
          currentIndex: number,
          object: O,
        ) => R,
        initialValue: R,
      ]
): R => {
  const [o, callbackfn] = args;
  let result: R;
  let index = -1;
  for (const key in o) {
    if (++index === 0) {
      if (args.length === 3) {
        result = args[2];
      } else {
        result = o[key] as R;
        continue;
      }
    }
    result = callbackfn(
      // @ts-expect-error - TS doesn't know that the result is defined
      result as StrictValues<O>[number] & R,
      [key, o[key]] as StrictEntries<O>[number],
      index,
      o,
    ) as R;
  }
  if (index === -1 && args.length === 2)
    throw new TypeError('Reduce of empty object with no initial value');
  return result!;
};

export default reduce;
