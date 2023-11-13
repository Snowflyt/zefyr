import type { ListOf } from '../internal/types/union';

export type StrictEntries<T extends object> = keyof T extends symbol
  ? []
  : string extends keyof T
  ? [`${Exclude<keyof T, symbol>}`, T[Exclude<keyof T, symbol>]][]
  : number extends keyof T
  ? [`${Exclude<keyof T, symbol>}`, T[Exclude<keyof T, symbol>]][]
  : _StrictEntries<T, ListOf<keyof T>>[];
type _StrictEntries<T, TKeys extends readonly (string | number | symbol)[]> = TKeys extends [
  infer THead,
  ...infer TTail,
]
  ? THead extends keyof T
    ? TTail extends (string | number | symbol)[]
      ? THead extends symbol
        ? _StrictEntries<T, TTail>
        : THead extends string
        ? [THead, T[THead]] | _StrictEntries<T, TTail>
        : THead extends number
        ? [`${THead}`, T[THead]] | _StrictEntries<T, TTail>
        : never
      : never
    : never
  : never;

/**
 * Returns an array of key/values of the enumerable properties of an object (using `Object.entries`, but with stricter TypeScript typings).
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: true, 5: 42, [Symbol()]: 'symbol' };
 * entriesS(obj); // => [['5', 42], ['a', 1], ['b', 2], ['c', true]]
 * const entries = entriesS(obj); // entries :: (['5', number] | ['a', number] | ['b', number] | ['c', boolean])[]
 * ```
 *
 * @see {@link Object.entries}
 */
const entriesS = <T extends object>(o: T): StrictEntries<T> =>
  Object.entries(o) as StrictEntries<T>;

export default entriesS;
