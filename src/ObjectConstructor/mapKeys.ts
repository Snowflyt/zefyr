import type { StrictKeys } from './keysS';
import type { StrictValues } from './valuesS';

/**
 * Calls a defined callback function on each enumerable key of an object, and returns an object that contains the results.
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 * @param callbackfn A function that accepts up to three arguments. The mapKeys function calls the callbackfn function one time for each key in the object.
 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
 * mapKeys(obj, (key) => `${key}_`); // => { '5_': 42, 'a_': 1, 'b_': 2 }
 * const mapped = mapKeys(obj, (key) => `${key}_`); // mapped :: { '5_': number, 'a_': number, 'b_': number }
 * ```
 */
const mapKeys = <const O extends object, R extends string>(
  o: O,
  callbackfn: (key: StrictKeys<O>[number], index: number, object: O) => R,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisArg?: any,
): { [P in R]: StrictValues<O>[number] } => {
  const result: Record<PropertyKey, unknown> = {};
  let index = -1;
  for (const key in o) {
    const newKey = callbackfn.call(
      thisArg,
      key as StrictKeys<O>[number],
      ++index,
      o,
    );
    result[newKey] = o[key];
  }
  return result as {
    [P in R]: StrictValues<O>[number];
  };
};

export default mapKeys;
