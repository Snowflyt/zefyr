import { describe, expect, it } from 'typroof';

import type { Mean } from './mean';

describe('Mean', () => {
  it('should return the mean of a number array or bigint array', () => {
    expect<Mean<number[]>>().toBe<number>();
    expect<Mean<readonly number[]>>().toBe<number>();
    expect<Mean<bigint[]>>().toBe<bigint>();
    expect<Mean<readonly bigint[]>>().toBe<bigint>();
  });

  it('should not accept types other than number or bigint, or mixed number and bigint', () => {
    expect<Mean<string[]>>().toBeNever();
    expect<Mean<readonly string[]>>().toBeNever();
    expect<Mean<(string | number)[]>>().toBeNever();
    expect<Mean<readonly (string | number)[]>>().toBeNever();
    expect<Mean<(number | bigint)[]>>().toBeNever();
    expect<Mean<readonly (number | bigint)[]>>().toBeNever();
  });

  it('should return 0 for empty arrays', () => {
    expect<Mean<[]>>().toBe<0>();
    expect<Mean<readonly []>>().toBe<0>();
  });

  it('should return the mean of a tuple of only numbers or only bigints', () => {
    expect<Mean<[1, 2, 3]>>().toBe<number>();
    expect<Mean<readonly [1, 2, 3]>>().toBe<number>();
    expect<Mean<[1n, 2n, 3n]>>().toBe<bigint>();
    expect<Mean<readonly [1n, 2n, 3n]>>().toBe<bigint>();
  });

  it('should not accept tuples of types other than number or bigint, or mixed number and bigint', () => {
    expect<Mean<['a', 'b', 'c']>>().toBeNever();
    expect<Mean<readonly ['a', 'b', 'c']>>().toBeNever();
    expect<Mean<[1, 2, 3, '4']>>().toBeNever();
    expect<Mean<readonly [1, 2, 3, '4']>>().toBeNever();
    expect<Mean<[1, 2, 3, 4n]>>().toBeNever();
    expect<Mean<readonly [1, 2, 3, 4n]>>().toBeNever();
  });
});
