import range from '../../Range/range';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * An iterable object representing a range of numbers.
   */
  interface Range {
    start: number;
    end: number;
    step: number;

    [Symbol.iterator](): IterableIterator<number>;

    toArray(): number[];
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
