import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/take';

describe('Array#take', () => {
  it('should take the first `count` elements from the array', () => {
    expect([1, 2, 3, 4, 5].take(3)).toEqual([1, 2, 3]);
    expect([1, 2, 3, 4, 5].take(0)).toEqual([]);
    expect([1, 2, 3, 4, 5].take(10)).toEqual([1, 2, 3, 4, 5]);
  });
});
