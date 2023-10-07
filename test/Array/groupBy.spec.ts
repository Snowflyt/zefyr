import { describe, expect, it } from 'vitest';

import '../../src/patches/Array/groupBy';
import '../../src/patches/global/path';
import '../../src/patches/global/prop';

describe('Array#groupBy', () => {
  it('should group by the given function', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    expect(arr.groupBy((value) => (value % 2 === 0 ? 'even' : 'odd'))).toEqual({
      odd: [1, 3, 5],
      even: [2, 4, 6],
    });
  });

  it('should group by the given property name', () => {
    const arr = [
      { v: 1, n: { v: 1 } },
      { v: 2, n: { v: 2 } },
      { v: 2, n: { v: 3 } },
    ];
    expect(arr.groupBy('v')).toEqual({
      1: [{ v: 1, n: { v: 1 } }],
      2: [
        { v: 2, n: { v: 2 } },
        { v: 2, n: { v: 3 } },
      ],
    });
  });

  it('should group by the given prop', () => {
    const arr = [
      { v: 1, n: { v: 1 } },
      { v: 2, n: { v: 2 } },
      { v: 2, n: { v: 3 } },
    ];
    expect(arr.groupBy(prop('v'))).toEqual({
      1: [{ v: 1, n: { v: 1 } }],
      2: [
        { v: 2, n: { v: 2 } },
        { v: 2, n: { v: 3 } },
      ],
    });
  });

  it('should group by the given path', () => {
    const arr = [
      { v: 1, n: { v: 1 } },
      { v: 2, n: { v: 2 } },
      { v: 2, n: { v: 3 } },
    ];
    expect(arr.groupBy(path('n.v'))).toEqual({
      1: [{ v: 1, n: { v: 1 } }],
      2: [{ v: 2, n: { v: 2 } }],
      3: [{ v: 2, n: { v: 3 } }],
    });
  });
});
