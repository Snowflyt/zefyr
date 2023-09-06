declare global {
  /**
   * Returns a generator that yields numbers from `start` to `end` (exclusive).
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
   * Returns a generator that yields numbers from `0` to `end` (exclusive).
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

export interface Range {
  start: number;
  end: number;
  step: number;

  [Symbol.iterator](): IterableIterator<number>;

  toArray(): number[];
}

export const range: {
  /**
   * Returns a generator that yields numbers from `start` to `end` (exclusive).
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
  (start: number, end: number, step?: number): Range;
  /**
   * Returns a generator that yields numbers from `0` to `end` (exclusive).
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
  (end: number): Range;
} = (startOrEnd: number, _end?: number, step: number = 1): Range => {
  const start = _end === undefined ? 0 : startOrEnd;
  const end = _end === undefined ? startOrEnd : _end;

  return {
    start,
    end,
    step,

    *[Symbol.iterator]() {
      if (step > 0) for (let i = start; i < end; i += step) yield i;
      else for (let i = start; i > end; i += step) yield i;
    },

    toArray() {
      return Array.from(this);
    },
  };
};
