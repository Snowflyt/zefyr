import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/dropUntil';

describe('Array#dropUntil', () => {
  it('should drop elements from the array until the predicate returns `true`', () => {
    expect([1, 2, 3, 4, 5].dropUntil((x) => x === 3)).toEqual([3, 4, 5]);
    expect([1, 2, 3, 4, 5].dropUntil((x) => x === 10)).toEqual([]);
  });
});
