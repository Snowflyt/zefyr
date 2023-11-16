import { describe, expect, it } from 'typroof';

import type { IsExact } from './assertion';

describe('IsExact', () => {
  it('should assert whether a type is exact', () => {
    expect<IsExact<1>>().toBe<true>();
    expect<IsExact<1 | 2>>().toBe<false>();
    expect<IsExact<{ a: 1; b: { c: readonly [4, 5, 6]; d: [true, false] } }>>().toBe<true>();
    expect<IsExact<{ a: number }>>().toBe<false>();
    expect<IsExact<{ b: 4 | 5 }>>().toBe<false>();
    expect<IsExact<{ a: 1; b: 2 }>>().toBe<true>();
    expect<IsExact<[true] | [true, false]>>().toBe<false>();
    expect<IsExact<[true, false, 3, 4, 5]>>().toBe<true>();
  });
});
