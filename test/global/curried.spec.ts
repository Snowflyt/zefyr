import { describe, expect, it } from 'vitest';

import '../../src/patches/global/curried';

describe('curried', () => {
  it('should return a curried function', () => {
    const add = (a: number, b: number) => a + b;
    const curriedAdd = curried(add);
    const add2 = curriedAdd(2);
    expect(add2(3)).toBe(5);
  });
});
