export type Compact<AS extends readonly unknown[]> = number extends AS['length']
  ? Array<Exclude<AS[number], Falsy>>
  : AS extends [] | readonly []
  ? []
  : Array<Exclude<AS[number], Falsy>>;

type Falsy = null | undefined | false | '' | 0 | 0n;

/**
 * Returns a new array without any falsy values. (i.e. `null`, `undefined`, `false`, `''`, `0`, `0n` or `NaN`)
 * @param array The array to compact.
 *
 * @example
 * ```typescript
 * const arr = [1, 2, undefined, 3, null];
 * arr.compact(); // => [1, 2, 3]
 * ```
 */
const compact = <AS extends unknown[] | readonly unknown[]>(
  array: AS,
): Compact<AS> => array.filter((v) => !!v) as Compact<AS>;

export default compact;
