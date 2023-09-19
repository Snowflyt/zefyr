import { describe, expect, it } from 'vitest';

import '../../src/patches/Number/isLength';

describe('Number#isLength', () => {
  it('should return true if value is a valid array-like length', () => {
    expect((3).isLength()).toBe(true);
    expect(Number.MAX_SAFE_INTEGER.isLength()).toBe(true);
  });

  it('should return false if value is not a valid array-like length', () => {
    expect((-1).isLength()).toBe(false);
    expect((1.23).isLength()).toBe(false);
    expect((Number.MAX_SAFE_INTEGER + 1).isLength()).toBe(false);
    expect(Infinity.isLength()).toBe(false);
  });
});
