import { describe, expect, it } from 'vitest';

import '../../src/patches/global/path';
import '../../src/patches/global/prop';
import '../../src/patches/ObjectConstructor/omit';

describe('Object.omit', () => {
  it('should omit properties', () => {
    const obj = { a: 1, b: 2, c: { d: [3, 4, 5] }, e: 6 };
    expect(Object.omit(obj, 'a', 'b')).toEqual({ c: { d: [3, 4, 5] }, e: 6 });
    expect(obj).toEqual({ a: 1, b: 2, c: { d: [3, 4, 5] }, e: 6 });
    expect(Object.omit(obj, path('c.d'))).toEqual({ a: 1, b: 2, c: {}, e: 6 });
    expect(obj).toEqual({ a: 1, b: 2, c: { d: [3, 4, 5] }, e: 6 });
    expect(Object.omit(obj, prop('e'), 'a', path('c.d[1]'))).toEqual({
      b: 2,
      c: { d: [3, 5] },
    });
    expect(obj).toEqual({ a: 1, b: 2, c: { d: [3, 4, 5] }, e: 6 });
  });
});
