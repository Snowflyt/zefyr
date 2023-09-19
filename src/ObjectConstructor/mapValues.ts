import type { StrictKeys } from './keysS';
import type { StrictValues } from './valuesS';

/**
 * Calls a defined callback function on each value of an object, and returns an object that contains the results.
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each key/value pair in the object.
 * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
 * mapValues(obj, (value) => value * 2); // => { '5': 84, 'a': 2, 'b': 4 }
 * const mapped = mapValues(obj, (value) => value * 2); // mapped :: { '5': number, 'a': number, 'b': number }
 * ```
 */
const mapValues = <const O extends object, const R>(
  o: O,
  callbackfn: (value: StrictValues<O>[number], index: number, object: O) => R,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisArg?: any,
): { [P in StrictKeys<O>[number]]: R } => {
  const values = Object.values(o);
  const mappedValues = values.map(function (this: unknown, value, index) {
    return callbackfn.call(this, value as StrictValues<O>[number], index, o);
  }, thisArg);
  return Object.fromEntries(mappedValues as never) as {
    [P in StrictKeys<O>[number]]: R;
  };
};

export default mapValues;
