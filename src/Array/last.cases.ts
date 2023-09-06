/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Last } from './last';
import type { Expect, ToBe } from '../types/test-helper';

// @ts-expect-error - Test case
type cases = [
  Expect<Last<number[]>, ToBe<number | undefined>>,
  Expect<Last<(string | number)[]>, ToBe<string | number | undefined>>,
  Expect<Last<readonly number[]>, ToBe<number | undefined>>,
  Expect<Last<readonly (string | number)[]>, ToBe<string | number | undefined>>,
  Expect<Last<[]>, ToBe<undefined>>,
  Expect<Last<['a']>, ToBe<'a'>>,
  Expect<Last<[1, 2, 3]>, ToBe<3>>,
  Expect<Last<[2, 3, null, undefined, 5]>, ToBe<5>>,
  Expect<Last<readonly []>, ToBe<undefined>>,
  Expect<Last<readonly ['a']>, ToBe<'a'>>,
  Expect<Last<readonly [1, 2, 3]>, ToBe<3>>,
  Expect<Last<readonly [2, 3, null, undefined, 5]>, ToBe<5>>,
];
