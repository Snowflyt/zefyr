import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isBigInt';

describe('isBigInt', () => {
  it('should return true if value is a bigint', () => {
    expect(isBigInt(0n)).toBe(true);
    expect(isBigInt(1n)).toBe(true);
    expect(isBigInt(Object(BigInt(1)))).toBe(true);
  });

  it('should return false if value is not a bigint', () => {
    expect(isBigInt('')).toBe(false);
  });
});
