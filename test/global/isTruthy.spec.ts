import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isTruthy';

describe('isTruthy', () => {
  it('should return true if value is truthy', () => {
    expect(isTruthy(true)).toBe(true);
    expect(isTruthy(1)).toBe(true);
    expect(isTruthy('a')).toBe(true);
    expect(isTruthy([])).toBe(true);
    expect(isTruthy({})).toBe(true);
    expect(isTruthy(() => {})).toBe(true);
    expect(isTruthy(' ')).toBe(true);
  });

  it('should return false if value is not truthy', () => {
    expect(isTruthy('')).toBe(false);
    expect(isTruthy(0)).toBe(false);
    expect(isTruthy(false)).toBe(false);
    expect(isTruthy(null)).toBe(false);
    expect(isTruthy(undefined)).toBe(false);
  });
});
