import { describe, expect, it } from 'vitest';

import '../../src/patches/ObjectConstructor/mapKeys';

describe('Object.mapKeys', () => {
  it('should call a defined callback function on each key of an object, and returns an object that contains the results', () => {
    const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
    const mapped = Object.mapKeys(obj, (key) => `${key}_`);
    expect(mapped).toStrictEqual({ '5_': 42, a_: 1, b_: 2 });
    expect(mapped).not.toBe(obj);
  });
});
