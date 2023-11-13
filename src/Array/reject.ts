/**
 * Returns the elements of the array that don't meet the condition.
 * @param array The array to process.
 * @param predicate A function that accepts up to three arguments. The reject method calls the predicate function one time for each element in the array.
 * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
 */
const reject = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisArg: any = undefined,
): T[] => array.filter((value, index, array) => !predicate(value, index, array), thisArg);

export default reject;
