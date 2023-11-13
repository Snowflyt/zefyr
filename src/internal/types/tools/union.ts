import type { Ary } from './ary';
import type { Cast, Eq$ } from './common';
import type { Assume, HKT1, HKT2, Pipe2 } from './hkt';
import type { List } from './list';

type _ToList<U, LN extends List = [], LastU = Last<U>> = {
  0: _ToList<Exclude<U, LastU>, [LastU, ...LN]>;
  1: LN;
}[[U] extends [never] ? 1 : 0];
type Last<U> = IntersectOf<U extends unknown ? (x: U) => void : never> extends (x: infer P) => void
  ? P
  : never;
export type IntersectOf<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace Union {
  type ToList<U> = _ToList<U> extends infer X ? Cast<X, List> : never;

  export type Of1<A> = A;
  export interface Of1$ extends HKT1 {
    new: <A>(a: Assume<this['_1'], A>) => Of1<A>;
  }
  export type Of2<A, B> = A | B;
  export interface Of2$<B> extends HKT1 {
    new: <A>(a: Assume<this['_1'], A>) => Of2<A, B>;
  }
  export interface Of2$$ extends HKT2 {
    new: <A>(a: Assume<this['_1'], A>) => Of2<A, this['_2']>;
  }

  export type ExcludeEmptyObject<U> = Pipe2<
    ToList<U>,
    List.Reject$<Eq$<NonNullable<unknown>>>,
    Ary.Elem$
  >;
  export interface ExcludeEmptyObject$ extends HKT1 {
    new: <U>(u: Assume<this['_1'], U>) => ExcludeEmptyObject<U>;
  }
}
