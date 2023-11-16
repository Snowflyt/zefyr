import { describe, expect, it } from 'typroof';

import type { Compact } from './compact';

describe('Compact', () => {
  it('should compact arrays', () => {
    expect<Compact<number[]>>().toBe<number[]>();
    expect<Compact<readonly number[]>>().toBe<number[]>();
    expect<Compact<(number | null | undefined)[]>>().toBe<number[]>();
    expect<Compact<readonly (number | null | undefined)[]>>().toBe<number[]>();
    expect<Compact<(number | boolean)[]>>().toBe<(number | true)[]>();
    expect<Compact<readonly (number | boolean)[]>>().toBe<(number | true)[]>();
  });

  it('should compact empty tuples', () => {
    expect<Compact<[]>>().toBe<[]>();
    expect<Compact<readonly []>>().toBe<[]>();
  });

  it('should compact tuples', () => {
    expect<Compact<[0, 1, false, 2, '', 3]>>().toStrictCover<[1, 2, 3]>();
    expect<Compact<readonly [0, 1, false, 2, '', 3]>>().toStrictCover<[1, 2, 3]>();
    expect<Compact<[2, 3, null, undefined, 5]>>().toStrictCover<[2, 3, 5]>();
    expect<Compact<readonly [2, 3, null, undefined, 5]>>().toStrictCover<[2, 3, 5]>();
  });
});
