import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isBooleanPrimitive';

describe('isBooleanPrimitive', () => {
  it('should return true if value is a boolean primitive', () => {
    expect(isBooleanPrimitive(true)).toBe(true);
    expect(isBooleanPrimitive(false)).toBe(true);
  });

  it('should return false if value is not a boolean primitive', () => {
    expect(isBooleanPrimitive(new Boolean(true))).toBe(false);
    expect(isBooleanPrimitive('')).toBe(false);
  });
});
