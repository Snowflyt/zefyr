import { describe, expect, it } from 'vitest';

import '../../src/patches/BigInt/toJSON';

describe('BigInt#toJSON', () => {
  it('should return the string representation of the BigInt', () => {
    expect(10n.toJSON()).toBe('10');
  });

  it('should be used by JSON.stringify', () => {
    expect(JSON.stringify(10n)).toBe('"10"');
  });
});
