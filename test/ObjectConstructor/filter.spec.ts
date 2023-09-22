import { describe, expect, it } from 'vitest';

import '../../src/patches/ObjectConstructor/filter';

describe('Object.filter', () => {
  it('should filter entries', () => {
    const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
    expect(
      Object.filter(obj, ([key, value]) => key === 'a' || value === 42),
    ).toEqual({ 5: 42, a: 1 });
  });
});
