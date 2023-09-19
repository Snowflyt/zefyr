import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isStringPrimitive';

describe('isStringPrimitive', () => {
  it('should return true if value is a string primitive', () => {
    expect(isStringPrimitive('')).toBe(true);
    expect(isStringPrimitive('a')).toBe(true);
  });

  it('should return false if value is not a string primitive', () => {
    expect(isStringPrimitive(new String('foo'))).toBe(false);
    expect(isStringPrimitive(0)).toBe(false);
  });
});
