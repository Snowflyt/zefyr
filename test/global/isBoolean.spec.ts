import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isBoolean';

describe('isBoolean', () => {
  it('should return true if value is a boolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(new Boolean(true))).toBe(true);
  });

  it('should return false if value is not a boolean', () => {
    expect(isBoolean('')).toBe(false);
  });
});
