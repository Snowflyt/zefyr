import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/first';

describe('Array#first', () => {
  it('should return the first element of the array', () => {
    expect([1, 2, 3].first).toBe(1);
  });
});
