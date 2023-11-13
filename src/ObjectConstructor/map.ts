import type { StrictEntries } from './entriesS';

/**
 * Calls a defined callback function on each enumerable key/value pair of an object, and returns an object that contains the results.
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 * @param callbackfn A function that accepts up to three arguments. The map function calls the callbackfn function one time for each key/value pair in the object.
 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
 * map(obj, ([key, value]) => [`${key}_`, value * 2]); // => { '5_': 84, 'a_': 2, 'b_': 4 }
 * const mapped = map(obj, ([key, value]) => [`${key}_`, value * 2]); // mapped :: { '5_': number, 'a_': number, 'b_': number }
 * ```
 */
const map = <const O extends object, const R extends readonly [string, unknown]>(
  o: O,
  callbackfn: (entry: StrictEntries<O>[number], index: number, object: O) => R,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisArg?: any,
): { [P in R[0]]: R[1] } => {
  const result: Record<PropertyKey, unknown> = {};
  let index = -1;
  for (const key in o) {
    const newEntry = callbackfn.call(
      thisArg,
      [key, o[key]] as StrictEntries<O>[number],
      ++index,
      o,
    );
    result[newEntry[0]] = newEntry[1];
  }
  return result as { [P in R[0]]: R[1] };
};

export default map;
