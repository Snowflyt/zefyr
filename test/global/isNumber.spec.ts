import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isNumber';

describe('isNumber', () => {
  it('should return true if value is a number', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(1)).toBe(true);
    expect(isNumber(1.5)).toBe(true);
    expect(isNumber(new Number(1))).toBe(true);
  });

  it('should return false if value is not a number', () => {
    expect(isNumber('')).toBe(false);
  });
});
