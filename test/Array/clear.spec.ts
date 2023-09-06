import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/clear';

describe('Array#clear', () => {
  it('should clear the array', () => {
    const arr = [1, 2, 3];
    arr.clear();
    expect(arr).toEqual([]);
  });
});
