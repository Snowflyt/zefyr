/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Mean } from './mean';
import type { Expect, ToBe } from '../types/test-helper';

// @ts-expect-error - Test case
type cases = [
  Expect<Mean<number[]>, ToBe<number>>,
  Expect<Mean<bigint[]>, ToBe<bigint>>,
  Expect<Mean<string[]>, ToBe<never>>,
  Expect<Mean<(string | number)[]>, ToBe<never>>,
  Expect<Mean<(number | bigint)[]>, ToBe<never>>,
  Expect<Mean<readonly number[]>, ToBe<number>>,
  Expect<Mean<readonly bigint[]>, ToBe<bigint>>,
  Expect<Mean<readonly string[]>, ToBe<never>>,
  Expect<Mean<readonly (string | number)[]>, ToBe<never>>,
  Expect<Mean<readonly (number | bigint)[]>, ToBe<never>>,
  Expect<Mean<[]>, ToBe<0>>,
  Expect<Mean<[1, 2, 3]>, ToBe<number>>,
  Expect<Mean<[1n, 2n, 3n]>, ToBe<bigint>>,
  Expect<Mean<['a', 'b', 'c']>, ToBe<never>>,
  Expect<Mean<[1, 2, 3, '4']>, ToBe<never>>,
  Expect<Mean<[1, 2, 3, 4n]>, ToBe<never>>,
  Expect<Mean<readonly []>, ToBe<0>>,
  Expect<Mean<readonly [1, 2, 3]>, ToBe<number>>,
  Expect<Mean<readonly [1n, 2n, 3n]>, ToBe<bigint>>,
  Expect<Mean<readonly ['a', 'b', 'c']>, ToBe<never>>,
  Expect<Mean<readonly [1, 2, 3, '4']>, ToBe<never>>,
];
