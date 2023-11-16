import { describe, expect, it } from 'typroof';

import type { Median } from './median';

describe('Median', () => {
  it('should return the median of a number array or bigint array', () => {
    expect<Median<number[]>>().toBe<number>();
    expect<Median<readonly number[]>>().toBe<number>();
    expect<Median<bigint[]>>().toBe<bigint>();
    expect<Median<readonly bigint[]>>().toBe<bigint>();
  });

  it('should not accept types other than number or bigint, or mixed number and bigint', () => {
    expect<Median<string[]>>().toBeNever();
    expect<Median<readonly string[]>>().toBeNever();
    expect<Median<(string | number)[]>>().toBeNever();
    expect<Median<readonly (string | number)[]>>().toBeNever();
    expect<Median<(number | bigint)[]>>().toBeNever();
    expect<Median<readonly (number | bigint)[]>>().toBeNever();
  });

  it('should return never for empty arrays', () => {
    expect<Median<[]>>().toBeNever();
    expect<Median<readonly []>>().toBeNever();
  });

  it('should return the median of a tuple of only numbers or only bigints', () => {
    expect<Median<[1, 2, 3]>>().toBe<number>();
    expect<Median<readonly [1, 2, 3]>>().toBe<number>();
    expect<Median<[1n, 2n, 3n]>>().toBe<bigint>();
    expect<Median<readonly [1n, 2n, 3n]>>().toBe<bigint>();
  });

  it('should not accept tuples of types other than number or bigint, or mixed number and bigint', () => {
    expect<Median<['a', 'b', 'c']>>().toBeNever();
    expect<Median<readonly ['a', 'b', 'c']>>().toBeNever();
    expect<Median<[1, 2, 3, '4']>>().toBeNever();
    expect<Median<readonly [1, 2, 3, '4']>>().toBeNever();
    expect<Median<[1, 2, 3, 4n]>>().toBeNever();
    expect<Median<readonly [1, 2, 3, 4n]>>().toBeNever();
  });
});
