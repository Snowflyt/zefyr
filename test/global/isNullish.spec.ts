import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isNullish';

describe('isNullish', () => {
  it('should return true if value is null or undefined', () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
  });

  it('should return false if value is not null or undefined', () => {
    expect(isNullish('')).toBe(false);
    expect(isNullish(' ')).toBe(false);
    expect(isNullish('a')).toBe(false);
    expect(isNullish(0)).toBe(false);
  });
});
