import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/unique';

describe('Array#unique', () => {
  it('should return a new array with unique elements', () => {
    expect(
      [
        1,
        2,
        3,
        1,
        2,
        3,
        { a: [2], c: { d: 10 } },
        { a: [2], c: { d: 10 } },
      ].unique(),
    ).toEqual([1, 2, 3, { a: [2], c: { d: 10 } }]);
  });
});
