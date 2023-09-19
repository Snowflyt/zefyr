export type StrictValues<T extends object> = keyof T extends symbol
  ? []
  : T[Exclude<keyof T, symbol>][];

/**
 * Returns an array of values of the enumerable properties of an object (using `Object.values`, but with stricter TypeScript typings).
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3, 5: 42, [Symbol()]: 'symbol' };
 * valuesS(obj); // => [42, 1, 2, 3]
 * const values = valuesS(obj); // values :: number[]
 * ```
 *
 * @see {@link Object.values}
 */
const valuesS = <T extends object>(o: T): StrictValues<T> =>
  Object.values(o) as StrictValues<T>;

export default valuesS;
