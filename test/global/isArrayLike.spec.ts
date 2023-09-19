import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isArrayLike';

describe('isArrayLike', () => {
  it('should return true if value is array-like', () => {
    expect(isArrayLike([])).toBe(true);
    expect(isArrayLike({ length: 2 })).toBe(true);
    expect(isArrayLike('abc')).toBe(true);
  });

  it('should return false if value is not array-like', () => {
    expect(isArrayLike({ length: 2.5 })).toBe(false);
    expect(isArrayLike({ length: -1 })).toBe(false);
    expect(isArrayLike({ length: Number.MAX_SAFE_INTEGER + 1 })).toBe(false);
    expect(isArrayLike({ length: Infinity })).toBe(false);
    expect(isArrayLike({})).toBe(false);
  });
});
