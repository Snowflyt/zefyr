import { describe, expect, it } from 'vitest';

import '../../src/patches/global/cloneDeep';

describe('cloneDeep', () => {
  it('should clone an object', () => {
    const obj = { a: 1, b: { c: 2 }, d: [{ e: 3 }] };
    const copy = cloneDeep(obj);
    expect(copy).toStrictEqual(obj);
    copy.a = 2;
    copy.b.c = 3;
    copy.d[0]!.e = 4;
    copy.d.push({ f: 5 } as never);
    expect(obj).toStrictEqual({ a: 1, b: { c: 2 }, d: [{ e: 3 }] });
    expect(copy).toStrictEqual({ a: 2, b: { c: 3 }, d: [{ e: 4 }, { f: 5 }] });

    const objs = [{ a: 1 }, { b: 2 }];
    const deep = cloneDeep(objs);
    expect(deep[0] === objs[0]).toBe(false);
  });
});
