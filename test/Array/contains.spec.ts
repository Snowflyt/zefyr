import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/contains';

describe('Array#contains', () => {
  it('should return true if the array contains the given element', () => {
    expect(['a', 'b', 'c'].contains('b')).toBe(true);
  });

  it('should return false if the array does not contain the given element', () => {
    expect(['a', 'b', 'c'].contains('d')).toBe(false);
  });
});
