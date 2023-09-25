import equals from '../global/equals';

import type { IsExact } from '../internal/types/assertion';

export type Without<
  AS extends readonly unknown[],
  BS extends readonly unknown[],
> = number extends AS['length']
  ? Array<ExcludeBySequence<AS[number], KeepOnlyExact<BS>>>
  : RemoveTupleElementsByEquality<AS, BS>;

type KeepOnlyExact<AS extends readonly unknown[]> = AS extends readonly [
  infer AHead,
  ...infer ATail,
]
  ? IsExact<AHead> extends true
    ? [AHead, ...KeepOnlyExact<ATail>]
    : KeepOnlyExact<ATail>
  : [];

type ExcludeBySequence<A, TS extends readonly unknown[]> = TS extends readonly [
  infer THead,
  ...infer TTail,
]
  ? Exclude<ExcludeBySequence<A, TTail>, THead>
  : A;

type RemoveTupleElementsByEquality<
  AS extends readonly unknown[],
  TS extends readonly unknown[],
> = AS extends readonly [infer AHead, ...infer ATail]
  ? WillBeExcluded<AHead, TS> extends true
    ? RemoveTupleElementsByEquality<ATail, TS>
    : WillBeExcluded<AHead, TS> extends false
    ? [AHead, ...RemoveTupleElementsByEquality<ATail, TS>]
    :
        | RemoveTupleElementsByEquality<ATail, TS>
        | [AHead, ...RemoveTupleElementsByEquality<ATail, TS>]
  : [];
type WillBeExcluded<A, TS extends readonly unknown[]> = ExcludeBySequence<
  A,
  KeepOnlyExact<TS>
> extends never
  ? true
  : A & TS[number] extends never
  ? false
  : boolean;

/**
 * Returns a new array excluding all given values (using `equals` for equality comparisons).
 * @param array The array to get the values of.
 * @param values The values to exclude.
 *
 * @example
 * ```typescript
 * const arr = [1, 2, 3, 1, 2, 3, [1, 2, { b: 10 }]];
 * arr.without(1, 2, [1, 2, { b: 10 }]); // => [3, 3]
 * ```
 *
 * @see {@link equals}
 */
const without = <
  const AS extends readonly unknown[],
  const BS extends readonly AS[number][],
>(
  array: AS,
  ...values: BS
): Without<AS, BS> =>
  array.filter((a) => !values.some((b) => equals(a, b))) as Without<AS, BS>;

export default without;
