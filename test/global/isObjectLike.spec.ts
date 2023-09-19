import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isObjectLike';

describe('isObjectLike', () => {
  it('should return true if value is object-like', () => {
    expect(isObjectLike({})).toBe(true);
    expect(isObjectLike([])).toBe(true);
    expect(isObjectLike(new Set())).toBe(true);
    expect(isObjectLike(new Map())).toBe(true);
  });

  it('should return false if value is not object-like', () => {
    expect(isObjectLike(null)).toBe(false);
    expect(isObjectLike(undefined)).toBe(false);
    expect(isObjectLike(0)).toBe(false);
  });
});
