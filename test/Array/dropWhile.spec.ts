import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/dropWhile';

describe('Array#dropWhile', () => {
  it('should drop elements from the until the predicate returns `false`', () => {
    expect([1, 2, 3, 4, 5].dropWhile((x) => x < 3)).toEqual([3, 4, 5]);
    expect([1, 2, 3, 4, 5].dropWhile((x) => x > 10)).toEqual([1, 2, 3, 4, 5]);
  });
});
