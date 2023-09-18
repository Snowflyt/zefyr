import reject from '../../Array/reject';
import { patch } from '../../.internal/utils/patch';

declare global {
  interface Array<T> {
    /**
     * Returns the elements of an array that don't meet the condition.
     * @param predicate A function that accepts up to three arguments. The reject method calls the predicate function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
     */
    reject(
      predicate: (value: T, index: number, array: T[]) => boolean,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      thisArg?: any,
    ): T[];
  }
}

patch(Array).with({ reject });
