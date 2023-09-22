import { describe, expect, it } from 'vitest';

import '../../src/patches/ObjectConstructor/reduce';

describe('Object.reduce', () => {
  it('should reduce entries', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(Object.reduce(obj, (acc, [, value]) => acc + value)).toEqual(6);
    expect(Object.reduce(obj, (acc, [, value]) => acc + value, 2)).toEqual(8);
  });
});
