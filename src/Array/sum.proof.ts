import { describe, expect, it } from 'typroof';

import type { Sum } from './sum';

describe('Sum', () => {
  it('should return the sum of a number array or bigint array', () => {
    expect<Sum<number[]>>().toBe<number>();
    expect<Sum<readonly number[]>>().toBe<number>();
    expect<Sum<bigint[]>>().toBe<bigint>();
    expect<Sum<readonly bigint[]>>().toBe<bigint>();
  });

  it('should not accept types other than number or bigint, or mixed number and bigint', () => {
    expect<Sum<string[]>>().toBeNever();
    expect<Sum<readonly string[]>>().toBeNever();
    expect<Sum<(string | number)[]>>().toBeNever();
    expect<Sum<readonly (string | number)[]>>().toBeNever();
    expect<Sum<(number | bigint)[]>>().toBeNever();
    expect<Sum<readonly (number | bigint)[]>>().toBeNever();
  });

  it('should return 0 for empty arrays', () => {
    expect<Sum<[]>>().toBe<0>();
    expect<Sum<readonly []>>().toBe<0>();
  });

  it('should return the sum of a tuple of only numbers or only bigints', () => {
    expect<Sum<[1, 2, 3]>>().toBe<number>();
    expect<Sum<readonly [1, 2, 3]>>().toBe<number>();
    expect<Sum<[1n, 2n, 3n]>>().toBe<bigint>();
    expect<Sum<readonly [1n, 2n, 3n]>>().toBe<bigint>();
  });

  it('should not accept tuples of types other than number or bigint, or mixed number and bigint', () => {
    expect<Sum<['a', 'b', 'c']>>().toBeNever();
    expect<Sum<readonly ['a', 'b', 'c']>>().toBeNever();
    expect<Sum<[1, 2, 3, '4']>>().toBeNever();
    expect<Sum<readonly [1, 2, 3, '4']>>().toBeNever();
    expect<Sum<[1, 2, 3, 4n]>>().toBeNever();
    expect<Sum<readonly [1, 2, 3, 4n]>>().toBeNever();
  });
});
