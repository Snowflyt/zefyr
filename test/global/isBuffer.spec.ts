import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isBuffer';

describe('isBuffer', () => {
  it('should return true if value is a buffer', () => {
    expect(isBuffer(Buffer.alloc(2))).toBe(true);
  });

  it('should return false if value is not a buffer', () => {
    expect(isBuffer(new Uint8Array(2))).toBe(false);
    expect(isBuffer({})).toBe(false);
  });
});
