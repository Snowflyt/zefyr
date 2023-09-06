import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isPlainObject';

describe('isPlainObject', () => {
  class Foo {
    a = 1;
  }

  it('should return true if value is a plain object', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it('should return false if value is not a plain object', () => {
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject([1, 2, 3])).toBe(false);
    expect(isPlainObject(new Foo())).toBe(false);
  });
});
