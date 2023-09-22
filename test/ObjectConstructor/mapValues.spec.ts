import { describe, expect, it } from 'vitest';

import '../../src/patches/ObjectConstructor/mapValues';

describe('Object.mapValues', () => {
  it('should call a defined callback function on each value of an object, and returns an object that contains the results', () => {
    const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
    const mapped = Object.mapValues(obj, (value) => value * 2);
    expect(mapped).toStrictEqual({ '5': 84, a: 2, b: 4 });
    expect(mapped).not.toBe(obj);
  });
});
