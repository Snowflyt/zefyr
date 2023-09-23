import { describe, expect, it } from 'vitest';

import '../../src/patches/ExtendedObject/ex';

describe('ex', () => {
  it('should create an extended object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const exObj = ex(obj);
    expect(exObj).toStrictEqual(obj);
  });

  it('should create an extended object with additional methods', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const exObj = ex(obj);
    expect(
      exObj.filter(([, v]) => v % 2 === 0).mapKeys((k) => k.toUpperCase()),
    ).toStrictEqual({ B: 2 });
    expect(exObj.omit('a', 'b').size()).toBe(1);
  });
});
