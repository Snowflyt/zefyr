import type { ListOf } from '../internal/types/union';

export type Median<AS extends readonly unknown[]> = AS extends [] | readonly []
  ? never
  : HasOnlyNumberOrBigInt<ListOf<AS[number]>> extends true
  ? AS[number] extends number | bigint
    ? GeneralizeNumeric<AS[number]>
    : never
  : never;

type HasOnlyNumberOrBigInt<AS extends readonly unknown[]> = [
  HasOnlyNumberAndHaltAtNonNumeric<AS>,
  HasOnlyBigIntAndHaltAtNonNumeric<AS>,
] extends [true, false]
  ? true
  : [HasOnlyNumberAndHaltAtNonNumeric<AS>, HasOnlyBigIntAndHaltAtNonNumeric<AS>] extends [
      false,
      true,
    ]
  ? true
  : false;
type HasOnlyNumberAndHaltAtNonNumeric<AS extends readonly unknown[]> = AS extends readonly [
  infer THead,
  ...infer TTail,
]
  ? TTail extends []
    ? THead extends number
      ? true
      : false
    : THead extends number
    ? HasOnlyNumberAndHaltAtNonNumeric<TTail> extends true
      ? true
      : false
    : false
  : never;
type HasOnlyBigIntAndHaltAtNonNumeric<AS extends readonly unknown[]> = AS extends readonly [
  infer THead,
  ...infer TTail,
]
  ? TTail extends []
    ? THead extends bigint
      ? true
      : false
    : THead extends bigint
    ? HasOnlyBigIntAndHaltAtNonNumeric<TTail> extends true
      ? true
      : false
    : false
  : never;

type GeneralizeNumeric<N extends number | bigint> = number extends N
  ? N
  : bigint extends N
  ? N
  : N extends number
  ? number
  : bigint;

/**
 * Returns the median of all elements in the array (only for number or bigint arrays).
 *
 * If the array has an even number of elements, the median is the average of the two middle elements.
 * @param array The array to get the median of.
 *
 * @throws {TypeError} If the array is empty or contains non-numbers or mixed numbers and bigints.
 *
 * @example
 * ```typescript
 * const arr = [2, 1, 3.5, 3, 4];
 * median(array); // => 3
 * ```
 */
const median = <T>(array: T[] | readonly T[]): Median<typeof array> => {
  type R = Median<typeof array>;
  if (array.length === 0) throw new TypeError('Cannot get the median of an empty array');
  const type = typeof array[0];
  if (type !== 'number' && type !== 'bigint')
    throw new TypeError('Cannot get the median of an array of non-numbers');
  if (array.length === 1) return array[0] as R;
  const sorted = Array.from(array).sort((a, b) => {
    if (
      (typeof a !== 'number' && typeof a !== 'bigint') ||
      (typeof b !== 'number' && typeof b !== 'bigint')
    )
      throw new TypeError('Cannot get the median of an array of non-numbers');
    if (typeof a !== type || typeof b !== type)
      throw new TypeError('Cannot get the median of an array of mixed numbers and bigints');
    const diff = (a as number) - (b as number);
    if (type === 'number') return diff;
    return diff > 0n ? 1 : diff < 0n ? -1 : 0;
  });
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0)
    return ((((sorted[middle - 1] as number) + (sorted[middle] as number)) as R) /
      ((type === 'bigint' ? 2n : 2) as R)) as R;
  return sorted[middle] as R;
};

export default median;
