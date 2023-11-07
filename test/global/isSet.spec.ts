import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isSet';

describe('isSet', () => {
  it('should return true if value is a Set', () => {
    expect(isSet(new Set())).toBe(true);
  });

  it('should return false if value is not a Set', () => {
    expect(isSet(new WeakSet())).toBe(false);
    expect(isSet({})).toBe(false);
  });
});
