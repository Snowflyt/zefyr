import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/mean';

describe('Array#mean', () => {
  it('should return the mean of all elements in the array', () => {
    expect([2, 1, 3.5, 3, 4].mean()).toBe(2.7);
    expect([].mean()).toBe(0);
  });

  it('should return the mean of bigint array', () => {
    expect([2n, 1n, 3n, 3n, 4n].mean()).toBe(2n);
  });

  it('should throw if the array contains non-numbers', () => {
    expect(() => ['a', 1, 2].mean()).toThrow(TypeError);
    expect(() => [1, 2, 'a'].mean()).toThrow(TypeError);
  });

  it('should throw if the array contains mixed numbers and bigints', () => {
    expect(() => [1, 2n, 3].mean()).toThrow(TypeError);
    expect(() => [1n, 2, 3n].mean()).toThrow(TypeError);
  });
});
