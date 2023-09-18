import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isArray';

describe('isArray', () => {
  it('should return true if value is an array', () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(new Array(5))).toBe(true);
  });

  it('should return false if value is not an array', () => {
    expect(isArray({})).toBe(false);
    expect(isArray('')).toBe(false);
    expect(isArray(new Int16Array([15, 33]))).toBe(false);
  });
});
