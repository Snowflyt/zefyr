/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Distribute } from './distribute';
import type { Expect, ToBe } from './test-helper';

// @ts-expect-error - Test case
type cases_Distribute = [
  Expect<Distribute<[1, 3 | 4]>, ToBe<[1, 3] | [1, 4]>>,
  Expect<
    Distribute<[1 | 2, 3 | 4, 5]>,
    ToBe<[1, 3, 5] | [1, 4, 5] | [2, 3, 5] | [2, 4, 5]>
  >,
  Expect<Distribute<[boolean]>, ToBe<[true] | [false]>>,
];
