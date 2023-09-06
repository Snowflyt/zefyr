import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/last';

describe('Array#last', () => {
  it('should return the last element of the array', () => {
    expect([1, 2, 3].last).toBe(3);
  });
});
