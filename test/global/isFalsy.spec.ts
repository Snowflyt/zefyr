import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isFalsy';

describe('isFalsy', () => {
  it('should return true if value is falsy', () => {
    expect(isFalsy(false)).toBe(true);
    expect(isFalsy(0)).toBe(true);
    expect(isFalsy(NaN)).toBe(true);
    expect(isFalsy('')).toBe(true);
    expect(isFalsy(null)).toBe(true);
    expect(isFalsy(undefined)).toBe(true);
  });

  it('should return false if value is not falsy', () => {
    expect(isFalsy(' ')).toBe(false);
    expect(isFalsy([])).toBe(false);
    expect(isFalsy({})).toBe(false);
    expect(isFalsy(() => {})).toBe(false);
    expect(isFalsy('a')).toBe(false);
  });
});
