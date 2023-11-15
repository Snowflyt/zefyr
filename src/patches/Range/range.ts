import range from '../../Range/range';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * An iterable object representing a range of numbers.
   */
  interface Range extends ReadonlyArray<number> {
    /**
     * Start of the range.
     */
    readonly start: number;
    /**
     * End of the range (exclusive).
     */
    readonly end: number;
    /**
     * Step size of the range.
     */
    readonly step: number;
    /**
     * Gets or the length of the range.
     */
    readonly length: number;

    readonly [Symbol.iterator]: () => IterableIterator<number>;

    /**
     * Returns a range with the same start, end, and step.
     *
     * @example
     * ```typescript
     * const rg = range(2, 5, 2);
     * rg; // => 2..5 by 2
     * rg.clone(); // => 2..5 by 2
     * ```
     */
    readonly clone: () => this;

    /**
     * Convert the range to an array.
     *
     * @example
     * ```typescript
     * range(3).toArray(); // => [0, 1, 2]
     * range(2, 5).toArray(); // => [2, 3, 4]
     * range(2, 5, 2).toArray(); // => [2, 4]
     * range(5, 2, -1).toArray(); // => [5, 4, 3]
     * ```
     */
    readonly toArray: () => number[];

    /**
     * Returns a string representation of the range.
     *
     * @example
     * ```typescript
     * range(3).toString(); // => '0..3'
     * range(2, 5).toString(); // => '2..5'
     * range(2, 5, 2).toString(); // => '2..5 by 2'
     * range(5, 2, -1).toString(); // => '5..2 by -1'
     * ```
     */
    readonly toString: () => string;
  }

  /**
   * Returns an iterable object that yields numbers from `start` to `end` (exclusive).
   * @param start The starting number.
   * @param end The ending number (exclusive).
   * @param [step] The step size.
   *
   * @example
   * ```typescript
   * for (const i of range(2, 5)) {
   *   console.log(i);
   *   // 2
   *   // 3
   *   // 4
   * }
   * ```
   */
  function range(start: number, end: number, step?: number): Range;
  /**
   * Returns an iterable object that yields numbers from `0` to `end` (exclusive).
   * @param end The ending number (exclusive).
   *
   * @example
   * ```typescript
   * for (const i of range(3)) {
   *   console.log(i);
   *   // 0
   *   // 1
   *   // 2
   * }
   * ```
   */
  function range(end: number): Range;
}

patch(globalThis).withStatic({ range });
