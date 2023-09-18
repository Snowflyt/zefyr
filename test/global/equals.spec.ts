import { describe, expect, it } from 'vitest';

import '../../src/patches/global/equals';

describe('equals', () => {
  it('should return true if arguments are equal', () => {
    expect(equals(1, 1)).toBe(true);
    expect(equals(1, '1' as never)).toBe(false);
    expect(equals([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(equals({ a: [1], b: { c: 'd' } }, { a: [1], b: { c: 'd' } })).toBe(
      true,
    );

    const a = {};
    Object.assign(a, { v: a });
    const b = {};
    Object.assign(b, { v: b });
    expect(equals(a, b)).toBe(true);
  });
});
