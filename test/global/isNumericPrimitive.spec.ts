import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isNumericPrimitive';

describe('isNumericPrimitive', () => {
  it('should return true if value is a number primitive', () => {
    expect(isNumericPrimitive(0)).toBe(true);
    expect(isNumericPrimitive(1)).toBe(true);
    expect(isNumericPrimitive(1.5)).toBe(true);
  });

  it('should return true if value is a bigint primitive', () => {
    expect(isNumericPrimitive(0n)).toBe(true);
    expect(isNumericPrimitive(1n)).toBe(true);
  });

  it('should return false if value is not a number primitive or bigint primitive', () => {
    expect(isNumericPrimitive(Object(1))).toBe(false);
    expect(isNumericPrimitive('')).toBe(false);
  });
});
