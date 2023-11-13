import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/takeWhile';

describe('Array#takeWhile', () => {
  it('should take elements from the array until the predicate returns `false`', () => {
    expect([1, 2, 3, 4, 5].takeWhile((x) => x < 4)).toEqual([1, 2, 3]);
    expect([1, 2, 3, 4, 5].takeWhile((x) => x > 10)).toEqual([]);
  });
});
