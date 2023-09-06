import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/without';

describe('Array#without', () => {
  it('should return a new array without the given elements', () => {
    expect([1, 2, 3, 4, 5].without(2, 3)).toEqual([1, 4, 5]);
    expect([1, 2, 3, 4, 5].without(2, 3, 6)).toEqual([1, 4, 5]);
  });
});
