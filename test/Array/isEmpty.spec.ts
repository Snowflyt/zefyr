import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/isEmpty';

describe('Array#isEmpty', () => {
  it('should return true if array is empty', () => {
    expect([].isEmpty()).toBe(true);
  });

  it('should return false if array is not empty', () => {
    expect([1, 2, 3].isEmpty()).toBe(false);
  });
});
