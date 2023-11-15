import { describe, expect, it } from 'vitest';

import '../../src/patches/global/enumerate';

describe('enumerate', () => {
  it('should enumerate an iterable', () => {
    const iterable = ['a', 'b', 'c'];
    const enumerated = enumerate(iterable);
    expect([...enumerated]).toEqual([
      [0, 'a'],
      [1, 'b'],
      [2, 'c'],
    ]);
  });
});
