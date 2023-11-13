/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Without } from './without';
import type { Expect, ToBe, ToCover } from '../internal/types/test-helper';

// @ts-expect-error - Test case
type cases = [
  Expect<Without<number[], [number]>, ToBe<number[]>>,
  Expect<Without<(string | null)[], [null]>, ToBe<string[]>>,
  Expect<Without<(string | null | undefined)[], [null, undefined]>, ToBe<string[]>>,
  Expect<Without<(string | boolean)[], [true]>, ToBe<(string | false)[]>>,
  Expect<Without<(string | boolean)[], [true, false]>, ToBe<string[]>>,
  Expect<Without<(string | number)[], [false]>, ToBe<(string | number)[]>>,
  Expect<
    Without<
      ({ type: 'A'; value: number } | { type: 'C'; value: null })[],
      [{ type: 'A'; value: number }, { type: 'C'; value: null }]
    >,
    ToBe<{ type: 'A'; value: number }[]>
  >,
  Expect<Without<readonly number[], [number]>, ToBe<number[]>>,
  Expect<Without<readonly (string | null)[], [null]>, ToBe<string[]>>,
  Expect<Without<readonly (string | null | undefined)[], [null, undefined]>, ToBe<string[]>>,
  Expect<Without<readonly (string | boolean)[], [true]>, ToBe<(string | false)[]>>,
  Expect<Without<readonly (string | boolean)[], [true, false]>, ToBe<string[]>>,
  Expect<Without<readonly (string | number)[], [false]>, ToBe<(string | number)[]>>,
  Expect<
    Without<
      readonly ({ type: 'A'; value: number } | { type: 'C'; value: null })[],
      [{ type: 'A'; value: number }, { type: 'C'; value: null }]
    >,
    ToBe<{ type: 'A'; value: number }[]>
  >,
  Expect<Without<[], [1]>, ToBe<[]>>,
  Expect<Without<[1, 2, 3], [2]>, ToBe<[1, 3]>>,
  Expect<Without<[1, 2, 3], [2, 3]>, ToBe<[1]>>,
  Expect<Without<[1, 2, 3], [2, 1 | 3]>, ToCover<[1] | [3]>>,
  Expect<Without<readonly [], [1]>, ToBe<[]>>,
  Expect<Without<readonly [1, 2, 3], [2]>, ToBe<[1, 3]>>,
  Expect<Without<readonly [1, 2, 3], [2, 3]>, ToBe<[1]>>,
  Expect<Without<readonly [1, 2, 3], [2, 1 | 3]>, ToCover<[1] | [3]>>,
];
