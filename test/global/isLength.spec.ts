import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isLength';

describe('isLength', () => {
  it('should return true if value is a valid array-like length', () => {
    expect(isLength(3)).toBe(true);
    expect(isLength(Number.MAX_SAFE_INTEGER)).toBe(true);
  });

  it('should return false if value is not a valid array-like length', () => {
    expect(isLength(-1)).toBe(false);
    expect(isLength(1.23)).toBe(false);
    expect(isLength(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
    expect(isLength(Infinity)).toBe(false);
  });
});
