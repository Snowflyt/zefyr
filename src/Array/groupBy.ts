import type { Cast } from '../internal/types/assertion';

/**
 * Returns an object composed of keys generated from the results of running each element of the array through `fn`.
 * The corresponding value of each key is an array of the elements responsible for generating the key.
 *
 * @param array The array to iterate over.
 * @param fn Prop, Path, a property name or a function that accepts up to three arguments. The groupBy function calls the fn function one time for each element of the array.
 *
 * @example
 * ```typescript
 * const arr1 = [1, 2, 42];
 * const arr2 = [{ v: 1, n: { v: 1 } }, { v: 2, n: { v: 2 } }, { v: 2, n: { v: 3 } }];
 * groupBy(arr1, (value) => value % 2 === 0 ? 'even' : 'odd'); // => { odd: [1], even: [2, 42] }
 * groupBy(arr2, 'v'); // => { 1: [{ v: 1, n: { v: 1 } }], 2: [{ v: 2, n: { v: 2 } }, { v: 2, n: { v: 3 } }] }
 * groupBy(arr2, prop('v')); // => { 1: [{ v: 1, n: { v: 1 } }], 2: [{ v: 2, n: { v: 2 } }, { v: 2, n: { v: 3 } }] }
 * groupBy(arr2, path('n.v')); // => { 1: [{ v: 1, n: { v: 1 } }], 2: [{ v: 2, n: { v: 2 } }], 3: [{ v: 2, n: { v: 3 } }] }
 * ```
 */
const groupBy: {
  <const T, const R extends PropertyKey = PropertyKey>(
    array: T[],
    fn: (value: T, index: number, array: T[]) => R,
  ): { [P in R]: T[] };
  <
    const T,
    const K extends {
      [P in keyof T]: T[P] extends PropertyKey ? P : never;
    }[keyof T],
  >(
    array: T[],
    propertyName: K,
  ): { [P in Cast<T[K], PropertyKey>]: T[] };
} = <
  const T,
  const K extends {
    [P in keyof T]: T[P] extends PropertyKey ? P : never;
  }[keyof T],
  const R extends PropertyKey = PropertyKey,
>(
  array: T[],
  fn: K | ((value: T, index: number, array: T[]) => R),
) => {
  const result: Record<PropertyKey, unknown[]> = {};
  let index = 0;
  for (const value of array) {
    const key =
      typeof fn === 'function'
        ? (fn(value, index, array) as PropertyKey)
        : (value[fn] as PropertyKey);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (key in result) result[key]!.push(value);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    else result[key] = [value];
    index++;
  }
  return result as never;
};

export default groupBy;
