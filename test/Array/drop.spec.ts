import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/drop';

describe('Array#drop', () => {
  it('should drop the first `count` elements from the array', () => {
    expect([1, 2, 3, 4, 5].drop(3)).toEqual([4, 5]);
    expect([1, 2, 3, 4, 5].drop(0)).toEqual([1, 2, 3, 4, 5]);
    expect([1, 2, 3, 4, 5].drop(10)).toEqual([]);
  });
});
