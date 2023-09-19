import { describe, expect, it } from 'vitest';

import '../../src/patches/global/is';

describe('is', () => {
  it('should return true if values are the same', () => {
    expect(is(25, 25)).toBe(true);
    expect(is('foo', 'foo')).toBe(true);
    expect(is(null, null)).toBe(true);
    expect(is(undefined, undefined)).toBe(true);
    expect(is(globalThis, globalThis)).toBe(true);
    const foo = { a: 1 };
    const sameFoo = foo;
    expect(is(foo, foo)).toBe(true);
    expect(is(foo, sameFoo)).toBe(true);

    expect(is(-0, -0)).toBe(true);

    expect(is(NaN, 0 / 0)).toBe(true);
    expect(is(NaN, Number.NaN)).toBe(true);
  });

  it('should return false if values are not the same', () => {
    expect(is('foo', 'bar')).toBe(false);
    expect(is([], [])).toBe(false);
    expect(is(0, -0)).toBe(false);
    expect(is(+0, -0)).toBe(false);
    const foo = { a: 1 };
    const bar = { a: 1 };
    expect(is(foo, bar)).toBe(false);
  });

  it('should work with currying', () => {
    expect([1, 2, 3, 2].filter(is(2))).toEqual([2, 2]);
    expect([1, [], 3, []].filter(is([]))).toEqual([]);
    expect([1, { a: 1 }, 3].filter(is({ a: 1 }))).toEqual([]);
  });
});
