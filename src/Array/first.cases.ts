/* eslint-disable @typescript-eslint/no-unused-vars */

import type { First } from './first';
import type { Expect, ToBe } from '../internal/types/test-helper';

// @ts-expect-error - Test case
type cases = [
  Expect<First<number[]>, ToBe<number | undefined>>,
  Expect<First<(string | number)[]>, ToBe<string | number | undefined>>,
  Expect<First<readonly number[]>, ToBe<number | undefined>>,
  Expect<
    First<readonly (string | number)[]>,
    ToBe<string | number | undefined>
  >,
  Expect<First<[]>, ToBe<undefined>>,
  Expect<First<[1, 2, 3]>, ToBe<1>>,
  Expect<First<[2, 3, null, undefined, 5]>, ToBe<2>>,
  Expect<First<readonly []>, ToBe<undefined>>,
  Expect<First<readonly [1, 2, 3]>, ToBe<1>>,
  Expect<First<readonly [2, 3, null, undefined, 5]>, ToBe<2>>,
];
