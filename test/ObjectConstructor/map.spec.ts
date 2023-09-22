import { describe, expect, it } from 'vitest';

import '../../src/patches/ObjectConstructor/map';

describe('Object.map', () => {
  it('should call a defined callback function on each key/value pair of an object, and returns an object that contains the results', () => {
    const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
    const mapped = Object.map(obj, ([key, value]) => [`${key}_`, value * 2]);
    expect(mapped).toStrictEqual({ '5_': 84, a_: 2, b_: 4 });
    expect(mapped).not.toBe(obj);
  });
});
