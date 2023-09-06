import { describe, expect, it } from 'vitest';

import '../../src/patches/Number/digits';

describe('Number#digits', () => {
  it('should return the digits of a number in 10 base without braces', () => {
    expect((12345).digits.toArray()).toEqual([5, 4, 3, 2, 1]);
  });

  it('should return the digits of a number in 10 base with braces', () => {
    expect((12345).digits()).toEqual([5, 4, 3, 2, 1]);
  });

  it('should return the digits of a number in custom base', () => {
    expect((12345).digits(10)).toEqual([5, 4, 3, 2, 1]);
    expect((12345).digits(7)).toEqual([4, 6, 6, 0, 5]);
    expect((12345).digits(100)).toEqual([45, 23, 1]);
  });
});
