import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isNumeric';

describe('isNumeric', () => {
  it('should return true if value is a numeric primitive or object', () => {
    expect(isNumeric(0)).toBe(true);
    expect(isNumeric(1)).toBe(true);
    expect(isNumeric(1.5)).toBe(true);
    expect(isNumeric(0n)).toBe(true);
    expect(isNumeric(1n)).toBe(true);
    expect(isNumeric(new Number(1))).toBe(true);
    expect(isNumeric(Object(BigInt(1)))).toBe(true);
  });

  it('should return false if value is not a numeric primitive or object', () => {
    expect(isNumeric('')).toBe(false);
  });
});
