import { describe, expect, it } from 'vitest';

import '../../src/patches/Math/gcd';

describe('Math.gcd', () => {
  it('should return the greatest common divisor of a list of numbers', () => {
    expect(Math.gcd(8, 36)).toBe(4);
    expect(Math.gcd(-4, 6, 8)).toBe(2);
    expect(Math.gcd(12, 8, 32)).toBe(4);
    expect(Math.gcd(12, 8, 32, 7)).toBe(1);
    expect(Math.gcd(0, 12)).toBe(12);
    expect(Math.gcd(8, 0, 12)).toBe(4);
  });
});
