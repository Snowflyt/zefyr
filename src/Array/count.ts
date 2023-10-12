/**
 * Returns the count of elements from the array that satisfy the predicate.
 * @param array The array to take from.
 * @param pred The predicate function.
 *
 * @example
 * ```typescript
 * count([1, 2, 3, 3, 5], (x) => x === 3); // => 2
 * count([1, 2, 3, 4, 5], (x) => x === 10); // => 0
 * ```
 */
const count = <AS extends readonly unknown[]>(
  array: AS,
  pred: (value: AS[number], index: number, array: AS) => boolean,
): number => {
  let count = 0;
  for (const value of array) if (pred(value, count, array)) count++;
  return count;
};

export default count;
