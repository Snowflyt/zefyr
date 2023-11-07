import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isMap';

describe('isMap', () => {
  it('should return true if value is a Map', () => {
    expect(isMap(new Map())).toBe(true);
  });

  it('should return false if value is not a Map', () => {
    expect(isMap(new WeakMap())).toBe(false);
    expect(isMap({})).toBe(false);
  });
});
