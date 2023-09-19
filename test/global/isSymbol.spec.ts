import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isSymbol';

describe('isSymbol', () => {
  it('should return true if value is a symbol primitive or object', () => {
    expect(isSymbol(Symbol('foo'))).toBe(true);
    expect(isSymbol(Symbol.iterator)).toBe(true);
    expect(isSymbol(Object(Symbol('foo')))).toBe(true);
  });

  it('should return false if value is not a symbol primitive or object', () => {
    expect(isSymbol('foo')).toBe(false);
  });
});
