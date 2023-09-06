import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isPrimitive';

describe('isPrimitive', () => {
  it('should return true if value is a primitive', () => {
    expect(isPrimitive('')).toBe(true);
    expect(isPrimitive('a')).toBe(true);
    expect(isPrimitive(0)).toBe(true);
    expect(isPrimitive(false)).toBe(true);
    expect(isPrimitive(null)).toBe(true);
    expect(isPrimitive(undefined)).toBe(true);
  });

  it('should return false if value is not a primitive', () => {
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(() => {})).toBe(false);
    expect(isPrimitive(/a/)).toBe(false);
    expect(isPrimitive(new Number(0))).toBe(false);
    expect(isPrimitive(new String(''))).toBe(false);
  });
});
