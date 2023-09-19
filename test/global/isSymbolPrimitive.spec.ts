import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isSymbolPrimitive';

describe('isSymbolPrimitive', () => {
  it('should return true if value is a symbol primitive', () => {
    expect(isSymbolPrimitive(Symbol('foo'))).toBe(true);
    expect(isSymbolPrimitive(Symbol.iterator)).toBe(true);
  });

  it('should return false if value is not a symbol primitive', () => {
    expect(isSymbolPrimitive(Object(Symbol('foo')))).toBe(false);
    expect(isSymbolPrimitive('foo')).toBe(false);
  });
});
