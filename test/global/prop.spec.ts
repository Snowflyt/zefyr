import { describe, expect, it } from 'vitest';

import '../../src/patches/global/prop';

describe('prop', () => {
  it('should be able to get a property from an object', () => {
    const obj = { a: 1, b: 2 };
    const objs = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ];
    expect(objs.map(prop('a'))).toStrictEqual([1, 3]);
    expect(prop<typeof obj, 'a'>('a')(obj)).toBe(1);
  });

  it('should be able to compare a property', () => {
    const objs = [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ];
    expect(objs.filter(prop('a').eq(1))).toStrictEqual([{ a: 1, b: 2 }]);
  });
});
