import { describe, expect, it } from 'vitest';

import '../../src/patches/ObjectConstructor/withW';
import '../../src/patches/global/path';
import '../../src/patches/global/prop';

describe('Object.withW', () => {
  it('should set property by name', () => {
    const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
    expect(Object.withW(obj, 'a', 2)).toEqual({
      a: 2,
      b: 2,
      c: { d: [{ e: 3 }] },
    });
  });

  it('should set property by prop function', () => {
    const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
    expect(Object.withW(obj, prop('a'), 2)).toEqual({
      a: 2,
      b: 2,
      c: { d: [{ e: 3 }] },
    });
  });

  it('should set property by path function', () => {
    const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
    expect(Object.withW(obj, path('c.d[0].e'), 4)).toEqual({
      a: 1,
      b: 2,
      c: { d: [{ e: 4 }] },
    });
  });

  it('should set property by path array', () => {
    const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
    expect(Object.withW(obj, ['c', 'd', '0', 'e'], 4)).toEqual({
      a: 1,
      b: 2,
      c: { d: [{ e: 4 }] },
    });
  });
});
