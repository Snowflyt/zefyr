/**
 * Returns a function that when given a value returns the value of the specified property.
 * @param name The method to get.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: () => 3 };
 * const objs = [{ a: 1, b: 2, c: () => 3 }, { a: 4, b: 5, c: () => 6 }];
 * objs.map(method('c')); // => [3, 6]
 * [' a', ' b', ' c'].map(method('trim')); // => ['a', 'b', 'c']
 * method<typeof obj, 'c'>('c')(obj); // => 3
 * ```
 */
import { describe, expect, it } from 'vitest';

import '../../src/patches/global/method';

describe('method', () => {
  it('should be able to get a method from an object', () => {
    const obj = { a: 1, b: 2, c: () => 3 };
    const objs = [
      { a: 1, b: 2, c: () => 3 },
      { a: 4, b: 5, c: () => 6 },
    ];
    expect(objs.map(method('c'))).toStrictEqual([3, 6]);
    expect([' a', ' b', ' c'].map(method('trim'))).toStrictEqual([
      'a',
      'b',
      'c',
    ]);
    expect(method<typeof obj, 'c'>('c')(obj)).toBe(3);
  });
});
