import { describe, expect, it } from 'vitest';

import '../../src/patches/Math/lcm';

describe('Math.lcm', () => {
  it('should return the least common multiple of a list of numbers', () => {
    expect(Math.lcm(8, 36)).toBe(72);
    expect(Math.lcm(-4, 6, 8)).toBe(24);
    expect(Math.lcm(12, 8, 32)).toBe(96);
    expect(Math.lcm(12, 8, 32, 7)).toBe(672);
    expect(Math.lcm(0, 12)).toBe(0);
    expect(Math.lcm(8, 0, 12)).toBe(0);
  });
});
