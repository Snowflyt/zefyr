import { describe, expect, it } from 'vitest';

import '../../src/patches/global/invoke';

describe('invoke', () => {
  it('should be able to invoke methods', () => {
    const obj = { a: 1, b: 2, c: () => 3 };
    const objs = [
      { a: 1, b: 2, c: () => 3 },
      { a: 4, b: 5, c: () => 6 },
    ];
    expect(objs.map(invoke('c'))).toStrictEqual([3, 6]);
    expect([' a', ' b', ' c'].map(invoke('trim'))).toStrictEqual([
      'a',
      'b',
      'c',
    ]);
    expect(invoke<typeof obj, 'c'>('c')(obj)).toBe(3);
  });
});
