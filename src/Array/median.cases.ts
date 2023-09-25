/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Median } from './median';
import type { Expect, ToBe } from '../internal/types/test-helper';

// @ts-expect-error - Test case
type cases = [
  Expect<Median<number[]>, ToBe<number>>,
  Expect<Median<bigint[]>, ToBe<bigint>>,
  Expect<Median<string[]>, ToBe<never>>,
  Expect<Median<(string | number)[]>, ToBe<never>>,
  Expect<Median<(number | bigint)[]>, ToBe<never>>,
  Expect<Median<readonly number[]>, ToBe<number>>,
  Expect<Median<readonly bigint[]>, ToBe<bigint>>,
  Expect<Median<readonly string[]>, ToBe<never>>,
  Expect<Median<readonly (string | number)[]>, ToBe<never>>,
  Expect<Median<readonly (number | bigint)[]>, ToBe<never>>,
  Expect<Median<[]>, ToBe<never>>,
  Expect<Median<[1, 2, 3]>, ToBe<number>>,
  Expect<Median<[1n, 2n, 3n]>, ToBe<bigint>>,
  Expect<Median<['a', 'b', 'c']>, ToBe<never>>,
  Expect<Median<[1, 2, 3, '4']>, ToBe<never>>,
  Expect<Median<[1, 2, 3, 4n]>, ToBe<never>>,
  Expect<Median<readonly []>, ToBe<never>>,
  Expect<Median<readonly [1, 2, 3]>, ToBe<number>>,
  Expect<Median<readonly [1n, 2n, 3n]>, ToBe<bigint>>,
  Expect<Median<readonly ['a', 'b', 'c']>, ToBe<never>>,
  Expect<Median<readonly [1, 2, 3, '4']>, ToBe<never>>,
];
