import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/clone';

describe('Array#clone', () => {
  it('should return a new array with the same values', () => {
    const arr = [1, 2, 3];
    const arr2 = arr.clone();
    expect(arr2).toEqual([1, 2, 3]);
    arr2[0] = 4;
    expect(arr2).toEqual([4, 2, 3]);
    expect(arr).toEqual([1, 2, 3]);
  });
});
