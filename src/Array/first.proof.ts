import { describe, expect, it } from 'typroof';

import type { First } from './first';

describe('First', () => {
  it('should return the first element of an array', () => {
    expect<First<number[]>>().toBe<number | undefined>();
    expect<First<readonly number[]>>().toBe<number | undefined>();
    expect<First<(string | number)[]>>().toBe<string | number | undefined>();
    expect<First<readonly (string | number)[]>>().toBe<string | number | undefined>();
  });

  it('should return undefined for empty arrays', () => {
    expect<First<[]>>().toBe<undefined>();
    expect<First<readonly []>>().toBe<undefined>();
  });

  it('should return the first element of a tuple', () => {
    expect<First<[1, 2, 3]>>().toBe<1>();
    expect<First<readonly [1, 2, 3]>>().toBe<1>();
    expect<First<[2, 3, null, undefined, 5]>>().toBe<2>();
    expect<First<readonly [2, 3, null, undefined, 5]>>().toBe<2>();
  });
});
