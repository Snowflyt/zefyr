import { describe, expect, it } from 'vitest';

import '../../src/patches/global/iv';

describe('iv', () => {
  it('should be able to invoke methods', () => {
    const obj = { a: 1, b: 2, c: () => 3 };
    const objs = [
      { a: 1, b: 2, c: () => 3 },
      { a: 4, b: 5, c: () => 6 },
    ];
    expect(objs.map(iv('c'))).toStrictEqual([3, 6]);
    expect([' a', ' b', ' c'].map(iv('trim'))).toStrictEqual(['a', 'b', 'c']);
    expect(iv<typeof obj, 'c'>('c')(obj)).toBe(3);
  });
});
