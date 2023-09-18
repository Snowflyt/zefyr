/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Sum } from './sum';
import type { Expect, ToBe } from '../.internal/types/test-helper';

// @ts-expect-error - Test case
type cases = [
  Expect<Sum<number[]>, ToBe<number>>,
  Expect<Sum<bigint[]>, ToBe<bigint>>,
  Expect<Sum<string[]>, ToBe<never>>,
  Expect<Sum<(string | number)[]>, ToBe<never>>,
  Expect<Sum<(number | bigint)[]>, ToBe<never>>,
  Expect<Sum<readonly number[]>, ToBe<number>>,
  Expect<Sum<readonly bigint[]>, ToBe<bigint>>,
  Expect<Sum<readonly string[]>, ToBe<never>>,
  Expect<Sum<readonly (string | number)[]>, ToBe<never>>,
  Expect<Sum<readonly (number | bigint)[]>, ToBe<never>>,
  Expect<Sum<[]>, ToBe<0>>,
  Expect<Sum<[1, 2, 3]>, ToBe<number>>,
  Expect<Sum<[1n, 2n, 3n]>, ToBe<bigint>>,
  Expect<Sum<['a', 'b', 'c']>, ToBe<never>>,
  Expect<Sum<[1, 2, 3, '4']>, ToBe<never>>,
  Expect<Sum<[1, 2, 3, 4n]>, ToBe<never>>,
  Expect<Sum<readonly []>, ToBe<0>>,
  Expect<Sum<readonly [1, 2, 3]>, ToBe<number>>,
  Expect<Sum<readonly [1n, 2n, 3n]>, ToBe<bigint>>,
  Expect<Sum<readonly ['a', 'b', 'c']>, ToBe<never>>,
  Expect<Sum<readonly [1, 2, 3, '4']>, ToBe<never>>,
];
