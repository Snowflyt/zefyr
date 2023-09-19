import { describe, expect, it } from 'vitest';

import '../../src/patches/global/isFunction';

describe('isFunction', () => {
  it('should return true if value is a function', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(async () => {})).toBe(true);
    expect(isFunction(function* () {})).toBe(true);
    expect(isFunction(async function* () {})).toBe(true);
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    expect(isFunction(new Function())).toBe(true);
    expect(isFunction(function* () {}.bind(null))).toBe(true);
    expect(isFunction(async function* () {}.bind(null))).toBe(true);
    expect(isFunction(new Proxy(() => {}, {}))).toBe(true);
  });

  it('should return false if value is not a function', () => {
    expect(isFunction('')).toBe(false);
  });
});
