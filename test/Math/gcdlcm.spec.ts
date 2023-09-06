import { describe, expect, it } from 'vitest';

import '../../src/patches/Math/gcdlcm';

describe('Math.gcdlcm', () => {
  it('should return the greatest common divisor and least common multiple of a list of numbers', () => {
    expect(Math.gcdlcm(8, 36)).toEqual([4, 72]);
    expect(Math.gcdlcm(-4, 6, 8)).toEqual([2, 24]);
    expect(Math.gcdlcm(12, 8, 32)).toEqual([4, 96]);
    expect(Math.gcdlcm(12, 8, 32, 7)).toEqual([1, 672]);
    expect(Math.gcdlcm(0, 12)).toEqual([12, 0]);
    expect(Math.gcdlcm(8, 0, 12)).toEqual([4, 0]);
  });
});
