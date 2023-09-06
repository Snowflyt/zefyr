import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isNonNullish';

describe('isNonNullish', () => {
  it('should return true if value is not null or undefined', () => {
    expect(isNonNullish('')).toBe(true);
    expect(isNonNullish(' ')).toBe(true);
    expect(isNonNullish('a')).toBe(true);
    expect(isNonNullish(0)).toBe(true);
  });

  it('should return false if value is null or undefined', () => {
    expect(isNonNullish(null)).toBe(false);
    expect(isNonNullish(undefined)).toBe(false);
  });
});
