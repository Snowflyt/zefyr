import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/compact';

describe('Array#compact', () => {
  it('should return a new array with all falsy values removed', () => {
    expect([0, 1, false, 2, '', 3, null, undefined, NaN, 0n].compact()).toEqual(
      [1, 2, 3],
    );
  });
});
