import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isString';

describe('isString', () => {
  it('should return true if value is a string primitive or object', () => {
    expect(isString('')).toBe(true);
    expect(isString('a')).toBe(true);
    expect(isString(new String(''))).toBe(true);
  });

  it('should return false if value is not a string primitive or object', () => {
    expect(isString(0)).toBe(false);
  });
});
