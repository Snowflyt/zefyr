import { describe, expect, it } from 'typroof';

import type { Distribute } from './distribute';

describe('Distribute', () => {
  it('should distribute unions of tuples', () => {
    expect<Distribute<[1, 3 | 4]>>().toBe<[1, 3] | [1, 4]>();
    expect<Distribute<[1 | 2, 3 | 4, 5]>>().toBe<[1, 3, 5] | [1, 4, 5] | [2, 3, 5] | [2, 4, 5]>();
    expect<Distribute<[boolean]>>().toBe<[true] | [false]>();
  });
});
