import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isNumberPrimitive';

describe('isNumberPrimitive', () => {
  it('should return true if value is a number primitive', () => {
    expect(isNumberPrimitive(0)).toBe(true);
    expect(isNumberPrimitive(1)).toBe(true);
    expect(isNumberPrimitive(1.5)).toBe(true);
  });

  it('should return false if value is not a number primitive', () => {
    expect(isNumberPrimitive(Object(1))).toBe(false);
    expect(isNumberPrimitive('')).toBe(false);
  });
});
