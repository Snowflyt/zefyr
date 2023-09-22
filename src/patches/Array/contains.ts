import { patch } from '../../.internal/utils/patch';
import contains from '../../Array/contains';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Determines whether the array contains a certain element, returning true or false as appropriate (using `Array#includes`).
     *
     * It is the same as `Array#includes`, but serves as a type guard in TS.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     *
     * @example
     * ```typescript
     * list(1, 2, 3).contains(2); // => true
     * ['a', 'b', 'c'].contains('b'); // => true
     * ```
     *
     * @example
     * ```typescript
     * const s = 'foo' as string;
     * if (list('bar', 'baz').contains(s)) {
     *   const s2 = s; // s2 :: 'bar' | 'baz'
     * }
     * ```
     *
     * @see {@link Array#includes}
     */
    contains<const AS extends readonly unknown[]>(
      this: AS,
      searchElement: unknown,
      fromIndex?: number,
    ): AS;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Determines whether the array contains a certain element, returning true or false as appropriate (using `Array#includes`).
     *
     * It is the same as `Array#includes`, but serves as a type guard in TS.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     *
     * @example
     * ```typescript
     * list(1, 2, 3).contains(2); // => true
     * ['a', 'b', 'c'].contains('b'); // => true
     * ```
     *
     * @example
     * ```typescript
     * const s = 'foo' as string;
     * if (list('bar', 'baz').contains(s)) {
     *   const s2 = s; // s2 :: 'bar' | 'baz'
     * }
     * ```
     *
     * @see {@link Array#includes}
     */
    contains<const AS extends readonly unknown[]>(
      this: AS,
      searchElement: unknown,
      fromIndex?: number,
    ): searchElement is AS[number];
  }
}

patch(Array).with({ contains } as never);
