import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/takeUntil';

describe('Array#takeUntil', () => {
  it('should take elements from the array until the predicate returns `true`', () => {
    expect([1, 2, 3, 4, 5].takeUntil((x) => x === 3)).toEqual([1, 2]);
    expect([1, 2, 3, 4, 5].takeUntil((x) => x === 10)).toEqual([1, 2, 3, 4, 5]);
  });
});
