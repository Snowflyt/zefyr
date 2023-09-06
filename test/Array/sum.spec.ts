import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/sum';

describe('Array#sum', () => {
  it('should return the sum of all elements in the array', () => {
    expect([1, 2, 3].sum()).toBe(6);
    expect([].sum()).toBe(0);
  });

  it('should return the sum of bigint array', () => {
    expect([1n, 2n, 3n].sum()).toBe(6n);
  });

  it('should throw if the array contains non-numbers', () => {
    expect(() => ['a', 1, 2].sum()).toThrow(TypeError);
    expect(() => [1, 2, 'a'].sum()).toThrow(TypeError);
  });

  it('should throw if the array contains mixed numbers and bigints', () => {
    expect(() => [1, 2n, 3].sum()).toThrow(TypeError);
    expect(() => [1n, 2, 3n].sum()).toThrow(TypeError);
  });
});
