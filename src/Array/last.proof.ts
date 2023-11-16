import { describe, expect, it } from 'typroof';

import type { Last } from './last';

describe('Last', () => {
  it('should return the last element of an array', () => {
    expect<Last<number[]>>().toBe<number | undefined>();
    expect<Last<(string | number)[]>>().toBe<string | number | undefined>();
  });

  it('should return the last element of a readonly array', () => {
    expect<Last<readonly number[]>>().toBe<number | undefined>();
    expect<Last<readonly (string | number)[]>>().toBe<string | number | undefined>();
  });

  it('should return undefined for empty arrays', () => {
    expect<Last<[]>>().toBe<undefined>();
    expect<Last<readonly []>>().toBe<undefined>();
  });

  it('should return the last element of a tuple', () => {
    expect<Last<[1, 2, 3]>>().toBe<3>();
    expect<Last<[2, 3, null, undefined, 5]>>().toBe<5>();
  });

  it('should return the last element of a readonly tuple', () => {
    expect<Last<readonly [1, 2, 3]>>().toBe<3>();
    expect<Last<readonly [2, 3, null, undefined, 5]>>().toBe<5>();
  });
});
