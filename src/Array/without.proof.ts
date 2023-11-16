import { describe, expect, it } from 'typroof';

import type { Without } from './without';

describe('Without', () => {
  it('should remove elements from arrays', () => {
    expect<Without<number[], [number]>>().toBe<number[]>();
    expect<Without<readonly number[], [number]>>().toBe<number[]>();
    expect<Without<(string | null)[], [null]>>().toBe<string[]>();
    expect<Without<readonly (string | null)[], [null]>>().toBe<string[]>();
    expect<Without<(string | null | undefined)[], [null, undefined]>>().toBe<string[]>();
    expect<Without<readonly (string | null | undefined)[], [null, undefined]>>().toBe<string[]>();
    expect<Without<(string | boolean)[], [true]>>().toBe<(string | false)[]>();
    expect<Without<readonly (string | boolean)[], [true]>>().toBe<(string | false)[]>();
    expect<Without<(string | boolean)[], [true, false]>>().toBe<string[]>();
    expect<Without<readonly (string | boolean)[], [true, false]>>().toBe<string[]>();
    expect<Without<(string | number)[], [false]>>().toBe<(string | number)[]>();
    expect<Without<readonly (string | number)[], [false]>>().toBe<(string | number)[]>();
    expect<
      Without<
        ({ type: 'A'; value: number } | { type: 'C'; value: null })[],
        [{ type: 'A'; value: number }, { type: 'C'; value: null }]
      >
    >().toBe<{ type: 'A'; value: number }[]>();
    expect<
      Without<
        readonly ({ type: 'A'; value: number } | { type: 'C'; value: null })[],
        [{ type: 'A'; value: number }, { type: 'C'; value: null }]
      >
    >().toBe<{ type: 'A'; value: number }[]>();
  });

  it('should remove elements from tuples', () => {
    expect<Without<[], [1]>>().toBe<[]>();
    expect<Without<readonly [], [1]>>().toBe<[]>();
    expect<Without<[1, 2, 3], [2]>>().toBe<[1, 3]>();
    expect<Without<readonly [1, 2, 3], [2]>>().toBe<[1, 3]>();
    expect<Without<[1, 2, 3], [2, 3]>>().toBe<[1]>();
    expect<Without<readonly [1, 2, 3], [2, 3]>>().toBe<[1]>();
    expect<Without<[1, 2, 3], [2, 1 | 3]>>().toStrictCover<[1] | [3]>();
    expect<Without<readonly [1, 2, 3], [2, 1 | 3]>>().toStrictCover<[1] | [3]>();
  });
});
