/**
 * An iterable object representing a range of numbers.
 */
export interface Range extends ReadonlyArray<number> {
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

  readonly [n: number]: number;
  readonly [Symbol.iterator]: () => IterableIterator<number>;

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

const range: {
  /**
   * Returns an iterable object that yields numbers from `start` to `end` (exclusive).
   * @param start The starting number.
   * @param end The ending number (exclusive).
   * @param step The step size.
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
  (end: number): Range;
} = (startOrEnd: number, _end?: number, step: number = 1): Range => {
  if (!Number.isInteger(startOrEnd))
    if (_end === undefined) throw new TypeError('end of range must be an integer');
    else throw new TypeError('start of range must be an integer');
  if (_end !== undefined && !Number.isInteger(_end))
    throw new TypeError('end of range must be an integer');
  if (!Number.isInteger(step)) throw new TypeError('step of range must be an integer');

  const start = _end === undefined ? 0 : startOrEnd;
  const end = _end === undefined ? startOrEnd : _end;

  const length = Math.ceil((end - start) / step);

  const iterator = function* () {
    if (step > 0) for (let i = start; i < end; i += step) yield i;
    else for (let i = start; i > end; i += step) yield i;
  };
  let cachedArray: number[] | null = null;
  const toArray = () => {
    if (cachedArray === null) cachedArray = [...iterator()];
    return cachedArray;
  };

  const toString = () => {
    if (step === 1) return `${start}..${end}`;
    return `${start}..${end} by ${step}`;
  };

  const result = {
    start,
    end,
    step,
    length,

    first: start,
    last: start + step * (length - 1),

    *[Symbol.iterator]() {
      yield* iterator();
    },

    at: (index: number) => {
      if (index < 0) index += length;
      if (index < 0 || index >= length) return undefined;
      return start + step * index;
    },

    toArray,

    toString,
  } as Range;

  const ownKeys = Object.getOwnPropertyNames(result);

  return new Proxy(result, {
    get: ((): ((target: Range, p: string | symbol) => unknown) => {
      const cache: number[] = [];
      const iterator = result[Symbol.iterator]();

      return (target: Range, prop: string | symbol) => {
        if (typeof prop === 'symbol')
          if (prop === Symbol.iterator) return result[Symbol.iterator];
          else return toArray()[prop as unknown as number];

        if (/^[0-9]+$/.test(prop)) {
          const index = Number.parseInt(prop);
          if (index < 0 || index >= result.length) return undefined;
          if (cache[index] === undefined)
            for (let i = cache.length; i <= index; i++) cache.push(iterator.next().value as number);
          return cache[index];
        }
        if (ownKeys.includes(prop)) return target[prop as keyof Range];

        if (prop === 'clone') return () => range(start, end, step);

        const array = toArray();
        const res = array[prop as keyof typeof array];
        if (typeof res === 'function') return res.bind(array);
        return res;
      };
    })(),
  });
};

export default range;
