/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Compact } from './compact';
import type { Expect, ToBe, ToCover } from '../.internal/types/test-helper';

// @ts-expect-error - Test case
type cases = [
  Expect<Compact<number[]>, ToBe<number[]>>,
  Expect<Compact<(number | null | undefined)[]>, ToBe<number[]>>,
  Expect<Compact<(number | boolean)[]>, ToBe<(number | true)[]>>,
  Expect<Compact<readonly number[]>, ToBe<number[]>>,
  Expect<Compact<readonly (number | null | undefined)[]>, ToBe<number[]>>,
  Expect<Compact<readonly (number | boolean)[]>, ToBe<(number | true)[]>>,
  Expect<Compact<[]>, ToBe<[]>>,
  Expect<Compact<[0, 1, false, 2, '', 3]>, ToCover<[1, 2, 3]>>,
  Expect<Compact<[2, 3, null, undefined, 5]>, ToCover<[2, 3, 5]>>,
  Expect<Compact<readonly []>, ToBe<[]>>,
  Expect<Compact<readonly [0, 1, false, 2, '', 3]>, ToCover<[1, 2, 3]>>,
  Expect<Compact<readonly [2, 3, null, undefined, 5]>, ToCover<[2, 3, 5]>>,
];
