import type { Cast } from './assertion';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type List = readonly any[];

export type ListOf<U> = _ListOf<U> extends infer X ? Cast<X, List> : never;
type _ListOf<U, LN extends List = [], LastU = Last<U>> = {
  0: _ListOf<Exclude<U, LastU>, [LastU, ...LN]>;
  1: LN;
}[[U] extends [never] ? 1 : 0];

export type Last<U> = IntersectOf<U extends unknown ? (x: U) => void : never> extends (
  x: infer P,
) => void
  ? P
  : never;

export type IntersectOf<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;
