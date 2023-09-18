import { patch } from '../../.internal/utils/patch';
import isArray from '../../global/isArray';

declare global {
  /**
   * Returns `true` if the value is an array (using `Array.isArray`).
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isArray([]); // => true
   * isArray([1, 2, 3]); // => true
   * isArray({}); // => false
   * isArray(''); // => false
   * isArray(new Array(5)); // => true
   * isArray(new Int16Array([15, 33])); // => false
   * ```
   *
   * @example
   * ```typescript
   * const arr: number[] | null = [1, 2, 3];
   * if (isArray(arr)) {
   *   const arr2 = arr; // arr2 :: number[]
   * }
   * ```
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray}
   */
  function isArray(value: unknown): value is unknown[];
}

patch(globalThis).withStatic({ isArray });
