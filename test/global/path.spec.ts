import { describe, expect, it } from 'vitest';

import '../../src/patches/global/path';

describe('path', () => {
  it('should be able to get a property from an object by path', () => {
    const obj = { a: { b: [1, 2, 3] } };
    const objs = [
      { a: { b: [1, 2, 3], c: { 'abc d': { d: [42] } } } },
      { a: { b: [4, 5, 6] } },
    ];
    expect(path<typeof obj, 'a.b[0]'>('a.b[0]')(obj)).toBe(1);
    expect(path<typeof obj, ['a', 'b', '0']>(['a', 'b', '0'])(obj)).toBe(1);
    expect(objs.map(path('a.b[0]'))).toStrictEqual([1, 4]);
    expect(objs.map(path(['a', 'b', '0']))).toStrictEqual([1, 4]);
    expect(objs.map(path("a.c['abc d'].d[0]"))).toStrictEqual([42, undefined]);
    expect(objs.map(path(['a', 'c', 'abc d', 'd', '0']))).toStrictEqual([
      42,
      undefined,
    ]);
  });

  it('should be able to compare a property by path', () => {
    const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }];
    expect(objs.filter(path('a.b[0]').eq(1))).toStrictEqual([
      { a: { b: [1, 2, 3] } },
    ]);
    expect(objs.filter(path(['a', 'b', '0']).eq(1))).toStrictEqual([
      { a: { b: [1, 2, 3] } },
    ]);
  });
});
