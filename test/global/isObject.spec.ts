import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isObject';

describe('isObject', () => {
  it('should return true if value is an object', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(() => {})).toBe(true);
    expect(isObject(/a/)).toBe(true);
    expect(isObject(new Number(0))).toBe(true);
    expect(isObject(new String(''))).toBe(true);
  });

  it('should return false if value is not an object', () => {
    expect(isObject('')).toBe(false);
    expect(isObject('a')).toBe(false);
    expect(isObject(0)).toBe(false);
    expect(isObject(false)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});
