import { describe, expect, it } from 'vitest';

import '../../src/patches/global/clone';

describe('clone', () => {
  it('should clone an object', () => {
    const obj = { a: 1 };
    const copy = clone(obj);
    expect(copy).toStrictEqual(obj);
    copy.a = 2;
    expect(obj).toStrictEqual({ a: 1 });
    expect(copy).toStrictEqual({ a: 2 });
  });

  it('should only clone shallowly', () => {
    const objs = [{ a: 1 }, { b: 2 }];
    const shallow = clone(objs);
    expect(shallow[0] === objs[0]).toBe(true);
  });
});
