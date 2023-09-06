import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/unique';

describe('Array#unique', () => {
  it('should return a new array with unique elements', () => {
    expect([1, 2, 2, 3, 3, 3].unique()).toEqual([1, 2, 3]);
  });
});
