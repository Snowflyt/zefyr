import { describe, expect, it } from 'vitest';

import '../../src/patches/global/path';
import '../../src/patches/global/prop';
import '../../src/patches/ObjectConstructor/groupBy';

describe('Object.groupBy', () => {
  it('should group', () => {
    const obj = { a: 1, b: 2, 5: 42 };
    const obj2 = {
      a: { value: 1, nested: { v: 1 } },
      b: { value: 2, nested: { v: 2 } },
      c: { value: 2, nested: { v: 3 } },
    };
    expect(
      Object.groupBy(obj, ([, value]) => (value % 2 === 0 ? 'even' : 'odd')),
    ).toEqual({
      odd: [1],
      even: [42, 2],
    });
    expect(Object.groupBy(obj2, 'value')).toEqual({
      1: [{ value: 1, nested: { v: 1 } }],
      2: [
        { value: 2, nested: { v: 2 } },
        { value: 2, nested: { v: 3 } },
      ],
    });
    expect(Object.groupBy(obj2, prop('value'))).toEqual({
      1: [{ value: 1, nested: { v: 1 } }],
      2: [
        { value: 2, nested: { v: 2 } },
        { value: 2, nested: { v: 3 } },
      ],
    });
    expect(Object.groupBy(obj2, path('nested.v'))).toEqual({
      1: [{ value: 1, nested: { v: 1 } }],
      2: [{ value: 2, nested: { v: 2 } }],
      3: [{ value: 2, nested: { v: 3 } }],
    });
  });
});
