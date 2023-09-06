import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/median';

describe('Array#median', () => {
  it('should return the median of all elements in the array', () => {
    expect([1].median()).toBe(1);
    expect([1, 2].median()).toBe(1.5);
    expect([2, 1, 3.5, 3, 4].median()).toBe(3);
    expect([2, 1, 3.5, 3, 4, 5].median()).toBe(3.25);
  });

  it('should return the median of bigint array', () => {
    expect([1n].median()).toBe(1n);
    expect([1n, 2n].median()).toBe(1n);
    expect([2n, 1n, 3n, 3n, 4n].median()).toBe(3n);
    expect([2n, 1n, 3n, 4n, 5n, 6n].median()).toBe(3n);
  });

  it('should throw if the array is empty', () => {
    expect(() => [].median()).toThrow(TypeError);
  });

  it('should throw if the array contains non-numbers', () => {
    expect(() => ['a', 1, 2].median()).toThrow(TypeError);
    expect(() => [1, 2, 'a'].median()).toThrow(TypeError);
  });

  it('should throw if the array contains mixed numbers and bigints', () => {
    expect(() => [1, 2n, 3].median()).toThrow(TypeError);
    expect(() => [1n, 2, 3n].median()).toThrow(TypeError);
  });
});
