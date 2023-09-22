import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/sortBy';

describe('Array#sortBy', () => {
  it('should return a new array that is sorted by the given functions', () => {
    const objs = [
      { a: 1, b: 4 },
      { a: 3, b: 2 },
      { a: 3, b: 1 },
    ];
    expect(objs.sortBy((obj) => obj.b)).toEqual([
      { a: 3, b: 1 },
      { a: 3, b: 2 },
      { a: 1, b: 4 },
    ]);
    expect(
      objs.sortBy(
        (obj) => obj.a,
        (obj) => obj.b,
      ),
    ).toEqual([
      { a: 1, b: 4 },
      { a: 3, b: 1 },
      { a: 3, b: 2 },
    ]);
  });
});
