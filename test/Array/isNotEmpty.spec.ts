import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/isNotEmpty';

describe('Array#isNotEmpty', () => {
  it('should return true if array is not empty', () => {
    expect([].isNotEmpty()).toBe(false);
  });

  it('should return false if array is empty', () => {
    expect([1, 2, 3].isNotEmpty()).toBe(true);
  });
});
