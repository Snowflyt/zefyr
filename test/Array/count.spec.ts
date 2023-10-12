import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/count';

describe('Array#count', () => {
  it('should return the count of elements that satisfy the predicate', () => {
    expect([1, 2, 3, 3, 5].count((x) => x === 3)).toBe(2);
    expect([1, 2, 3, 3, 5].count((x) => x === 10)).toBe(0);
  });
});
