import { describe, expect, it } from 'vitest';

import '../../src/patches/global/words';

describe('words', () => {
  it('should be able to split a string into words', () => {
    expect(words('')).toStrictEqual(['']);
    expect(words('hello')).toStrictEqual(['hello']);
    expect(words('hello world')).toStrictEqual(['hello', 'world']);
    expect(words('red green blue')).toStrictEqual(['red', 'green', 'blue']);
    expect(words('  foo bar  baz ')).toStrictEqual(['foo', 'bar', 'baz']);
  });
});
