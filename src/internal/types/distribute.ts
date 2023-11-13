/**
 * Distribute a tuple of unions into a union of tuples.
 *
 * @example
 * ```typescript
 * type R = Distribute<[1, 'a' | 'b']>; // R :: [1, 'a'] | [1, 'b']
 * type R = Distribute<[1 | 2, 'a' | 'b']>; // R :: [1, 'a'] | [1, 'b'] | [2, 'a'] | [2, 'b']
 * type R = Distribute<[boolean]>; // R :: [true] | [false]
 * ```
 */
export type Distribute<TUnions extends readonly unknown[]> = TUnions extends [infer F, ...infer R]
  ? R extends unknown[]
    ? Distribute<R> extends infer DR extends unknown[]
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        F extends any
        ? [F, ...DR]
        : never
      : never
    : [F]
  : [];
