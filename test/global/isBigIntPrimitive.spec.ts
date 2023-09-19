import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isBigIntPrimitive';

describe('isBigIntPrimitive', () => {
  it('should return true if value is a bigint primitive', () => {
    expect(isBigIntPrimitive(0n)).toBe(true);
    expect(isBigIntPrimitive(1n)).toBe(true);
  });

  it('should return false if value is not a bigint primitive', () => {
    expect(isBigIntPrimitive(Object(BigInt(1)))).toBe(false);
    expect(isBigIntPrimitive('')).toBe(false);
  });
});
