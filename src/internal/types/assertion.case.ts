/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IsExact } from './assertion';
import type { Expect, ToBe } from './test-helper';

// @ts-expect-error - Test case
type cases_IsExact = [
  Expect<IsExact<1>, ToBe<true>>,
  Expect<IsExact<1 | 2>, ToBe<false>>,
  Expect<IsExact<{ a: 1; b: { c: readonly [4, 5, 6]; d: [true, false] } }>, ToBe<true>>,
  Expect<IsExact<{ a: number }>, ToBe<false>>,
  Expect<IsExact<{ b: 4 | 5 }>, ToBe<false>>,
  Expect<IsExact<{ a: 1; b: 2 }>, ToBe<true>>,
  Expect<IsExact<[true] | [true, false]>, ToBe<false>>,
  Expect<IsExact<[true, false, 3, 4, 5]>, ToBe<true>>,
];
