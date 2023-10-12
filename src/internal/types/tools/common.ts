import type { Bool, False, True } from './bool';
import type { Apply1, Assume, HKT1, HKT2, HKT3, HKT4, Pipe1 } from './hkt';
import type { List } from './list';
import type { Int, Nat } from './num';
import type { Str } from './str';

export type Cast<T, U> = T extends U ? T : U;

export interface NonNullable$ extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => NonNullable<typeof x>;
}

export type Eq<T, U> = (<G>() => G extends T ? 1 : 2) extends <
  G,
>() => G extends U ? 1 : 2
  ? True
  : False;
export interface Eq$<U> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => Eq<typeof x, U>;
}
export interface Eq$$ extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
  ) => Eq<typeof x, typeof y>;
}
export type IfEq<T, U, Then, Else> = If<Eq<T, U>, Then, Else>;
export interface IfEq$<U, Then, Else> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IfEq<typeof x, U, Then, Else>;
}
export interface IfEq$$<Then, Else> extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
  ) => IfEq<typeof x, typeof y, Then, Else>;
}
export interface IfEq$$$<Else> extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
    then: Assume<this['_3'], unknown>,
  ) => IfEq<typeof x, typeof y, typeof then, Else>;
}
export interface IfEq$$$$ extends HKT4 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
    then: Assume<this['_3'], unknown>,
    else_: Assume<this['_4'], unknown>,
  ) => IfEq<typeof x, typeof y, typeof then, typeof else_>;
}
export type IfpEq<T, U, ThenFn extends HKT1, ElseFn extends HKT1> = Eq<
  T,
  U
> extends True
  ? Apply1<ThenFn, T>
  : Apply1<ElseFn, T>;
export interface IfpEq$<U, ThenFn extends HKT1, ElseFn extends HKT1>
  extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IfpEq<typeof x, U, ThenFn, ElseFn>;
}
export interface IfpEq$$<ThenFn extends HKT1, ElseFn extends HKT1>
  extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
  ) => IfpEq<typeof x, typeof y, ThenFn, ElseFn>;
}
export interface IfpEq$$$<ElseFn extends HKT1> extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
    thenFn: Assume<this['_3'], HKT1>,
  ) => IfpEq<typeof x, typeof y, typeof thenFn, ElseFn>;
}
export interface IfpEq$$$$ extends HKT4 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
    thenFn: Assume<this['_3'], HKT1>,
    elseFn: Assume<this['_4'], HKT1>,
  ) => IfpEq<typeof x, typeof y, typeof thenFn, typeof elseFn>;
}

export type If<Cond extends Bool, Then, Else> = Cond extends True ? Then : Else;
export interface If$<Then, Else> extends HKT1 {
  new: (x: Assume<this['_1'], Bool>) => If<typeof x, Then, Else>;
}
export interface If$$<Else> extends HKT2 {
  new: (
    x: Assume<this['_1'], Bool>,
    y: Assume<this['_2'], unknown>,
  ) => If<typeof x, typeof y, Else>;
}
export interface If$$$ extends HKT3 {
  new: (
    x: Assume<this['_1'], Bool>,
    y: Assume<this['_2'], unknown>,
    z: Assume<this['_3'], unknown>,
  ) => If<typeof x, typeof y, typeof z>;
}

export type IfNot<Cond extends Bool, Then, Else> = If<Not<Cond>, Then, Else>;
export interface IfNot$<Then, Else> extends HKT1 {
  new: (x: Assume<this['_1'], Bool>) => IfNot<typeof x, Then, Else>;
}
export interface IfNot$$<Else> extends HKT2 {
  new: (
    x: Assume<this['_1'], Bool>,
    y: Assume<this['_2'], unknown>,
  ) => IfNot<typeof x, typeof y, Else>;
}
export interface IfNot$$$ extends HKT3 {
  new: (
    x: Assume<this['_1'], Bool>,
    y: Assume<this['_2'], unknown>,
    z: Assume<this['_3'], unknown>,
  ) => IfNot<typeof x, typeof y, typeof z>;
}

export interface Yield1$<T> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => T;
}
export interface Yield1$$ extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
  ) => typeof y;
}
export interface Yield2$$<T> extends HKT2 {
  new: (x: Assume<this['_1'], unknown>, y: Assume<this['_2'], unknown>) => T;
}
export interface Yield2$$$ extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
    z: Assume<this['_3'], unknown>,
  ) => typeof z;
}

export type Ifp<
  T,
  Pred extends HKT1,
  ThenFn extends HKT1,
  ElseFn extends HKT1,
> = Apply1<Pred, T> extends True ? Apply1<ThenFn, T> : Apply1<ElseFn, T>;
export interface Ifp$<
  Pred extends HKT1,
  ThenFn extends HKT1,
  ElseFn extends HKT1,
> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => Ifp<typeof x, Pred, ThenFn, ElseFn>;
}
export interface Ifp$$<ThenFn extends HKT1, ElseFn extends HKT1> extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    pred: Assume<this['_2'], HKT1>,
  ) => Ifp<typeof x, typeof pred, ThenFn, ElseFn>;
}
export interface Ifp$$$<ElseFn extends HKT1> extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    pred: Assume<this['_2'], HKT1>,
    thenFn: Assume<this['_3'], HKT1>,
  ) => Ifp<typeof x, typeof pred, typeof thenFn, ElseFn>;
}
export interface Ifp$$$$ extends HKT4 {
  new: (
    x: Assume<this['_1'], unknown>,
    pred: Assume<this['_2'], HKT1>,
    thenFn: Assume<this['_3'], HKT1>,
    elseFn: Assume<this['_4'], HKT1>,
  ) => Ifp<typeof x, typeof pred, typeof thenFn, typeof elseFn>;
}

export type IfNotP<
  T,
  Pred extends HKT1,
  ThenFn extends HKT1,
  ElseFn extends HKT1,
> = Apply1<Pred, T> extends False ? Apply1<ThenFn, T> : Apply1<ElseFn, T>;
export interface IfNotP$<
  Pred extends HKT1,
  ThenFn extends HKT1,
  ElseFn extends HKT1,
> extends HKT1 {
  new: (
    x: Assume<this['_1'], unknown>,
  ) => IfNotP<typeof x, Pred, ThenFn, ElseFn>;
}
export interface IfNotP$$<ThenFn extends HKT1, ElseFn extends HKT1>
  extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    pred: Assume<this['_2'], HKT1>,
  ) => IfNotP<typeof x, typeof pred, ThenFn, ElseFn>;
}
export interface IfNotP$$$<ElseFn extends HKT1> extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    pred: Assume<this['_2'], HKT1>,
    thenFn: Assume<this['_3'], HKT1>,
  ) => IfNotP<typeof x, typeof pred, typeof thenFn, ElseFn>;
}
export interface IfNotP$$$$ extends HKT4 {
  new: (
    x: Assume<this['_1'], unknown>,
    pred: Assume<this['_2'], HKT1>,
    thenFn: Assume<this['_3'], HKT1>,
    elseFn: Assume<this['_4'], HKT1>,
  ) => IfNotP<typeof x, typeof pred, typeof thenFn, typeof elseFn>;
}

export type IsNullish<T> = T extends Nullish ? True : False;
export interface IsNullish$ extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IsNullish<typeof x>;
}
export type IfNullish<T, Then, Else> = If<IsNullish<T>, Then, Else>;
export interface IfNullish$<Then, Else> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IfNullish<typeof x, Then, Else>;
}
export interface IfNullish$$<Else> extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
  ) => IfNullish<typeof x, typeof y, Else>;
}
export interface IfNullish$$$ extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
    z: Assume<this['_3'], unknown>,
  ) => IfNullish<typeof x, typeof y, typeof z>;
}
export type IsNonNullish<T> = Not<IsNullish<T>>;
export interface IsNonNullish$ extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IsNonNullish<typeof x>;
}
export type IfNonNullish<T, Then, Else> = If<IsNonNullish<T>, Then, Else>;
export interface IfNonNullish$<Then, Else> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IfNonNullish<typeof x, Then, Else>;
}
export interface IfNonNullish$$<Else> extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
  ) => IfNonNullish<typeof x, typeof y, Else>;
}
export interface IfNonNullish$$$ extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
    z: Assume<this['_3'], unknown>,
  ) => IfNonNullish<typeof x, typeof y, typeof z>;
}

export type In<T, AS extends List> = Pipe1<
  AS,
  List.Some$<IfpEq$<T, Yield1$<True>, IfCovers$<T, Bool, False>>>
>;
export interface In$<AS extends List> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => In<typeof x, AS>;
}
export interface In$$ extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    as: Assume<this['_2'], List>,
  ) => In<typeof x, typeof as>;
}
export type IfIn<T, AS extends List, Then, Else> = If<In<T, AS>, Then, Else>;
export interface IfIn$<AS extends List, Then, Else> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IfIn<typeof x, AS, Then, Else>;
}
export interface IfIn$$<Then, Else> extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    as: Assume<this['_2'], List>,
  ) => IfIn<typeof x, typeof as, Then, Else>;
}
export interface IfIn$$$<Else> extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    as: Assume<this['_2'], List>,
    then: Assume<this['_3'], unknown>,
  ) => IfIn<typeof x, typeof as, typeof then, Else>;
}
export interface IfIn$$$$ extends HKT4 {
  new: (
    x: Assume<this['_1'], unknown>,
    as: Assume<this['_2'], List>,
    then: Assume<this['_3'], unknown>,
    else_: Assume<this['_4'], unknown>,
  ) => IfIn<typeof x, typeof as, typeof then, typeof else_>;
}
export type IfpIn<
  T,
  AS extends List,
  ThenFn extends HKT1,
  ElseFn extends HKT1,
> = In<T, AS> extends True ? Apply1<ThenFn, T> : Apply1<ElseFn, T>;
export interface IfpIn$<
  AS extends List,
  ThenFn extends HKT1,
  ElseFn extends HKT1,
> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IfpIn<typeof x, AS, ThenFn, ElseFn>;
}
export interface IfpIn$$<ThenFn extends HKT1, ElseFn extends HKT1>
  extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    as: Assume<this['_2'], List>,
  ) => IfpIn<typeof x, typeof as, ThenFn, ElseFn>;
}
export interface IfpIn$$$<ElseFn extends HKT1> extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    as: Assume<this['_2'], List>,
    thenFn: Assume<this['_3'], HKT1>,
  ) => IfpIn<typeof x, typeof as, typeof thenFn, ElseFn>;
}
export interface IfpIn$$$$ extends HKT4 {
  new: (
    x: Assume<this['_1'], unknown>,
    as: Assume<this['_2'], List>,
    thenFn: Assume<this['_3'], HKT1>,
    elseFn: Assume<this['_4'], HKT1>,
  ) => IfpIn<typeof x, typeof as, typeof thenFn, typeof elseFn>;
}

export type Identity<T> = T;
export interface Identity$ extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => Identity<typeof x>;
}

export type Repeat<T, N extends Nat> = number extends Int.Dec<N>
  ? readonly T[]
  : N extends 0
  ? readonly []
  : readonly [T, ...Repeat<T, Int.Dec<N>>];
export interface Repeat$<N extends Nat> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => Repeat<typeof x, N>;
}

export type Not<B extends Bool> = Bool.Not<B>;
export interface Not$ extends HKT1 {
  new: (x: Assume<this['_1'], Bool>) => Not<typeof x>;
}

export type Extends<T, U> = T extends U ? True : False;
export interface Extends$<U> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => Extends<typeof x, U>;
}
export interface Extends$$ extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
  ) => Extends<typeof x, typeof y>;
}
export type IfExtends<T, U, Then, Else> = If<Extends<T, U>, Then, Else>;
export interface IfExtends$<U, Then, Else> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IfExtends<typeof x, U, Then, Else>;
}
export interface IfExtends$$<Then, Else> extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
  ) => IfExtends<typeof x, typeof y, Then, Else>;
}
export interface IfExtends$$$<Else> extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
    then: Assume<this['_3'], unknown>,
  ) => IfExtends<typeof x, typeof y, typeof then, Else>;
}
export interface IfExtends$$$$ extends HKT4 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
    then: Assume<this['_3'], unknown>,
    else_: Assume<this['_4'], unknown>,
  ) => IfExtends<typeof x, typeof y, typeof then, typeof else_>;
}

export type Covers<T, U> = U extends T ? True : False;
export interface Covers$<U> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => Covers<typeof x, U>;
}
export interface Covers$$ extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
  ) => Covers<typeof x, typeof y>;
}
export type IfCovers<T, U, Then, Else> = If<Covers<T, U>, Then, Else>;
export interface IfCovers$<U, Then, Else> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IfCovers<typeof x, U, Then, Else>;
}
export interface IfCovers$$<Then, Else> extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
  ) => IfCovers<typeof x, typeof y, Then, Else>;
}
export interface IfCovers$$$<Else> extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
    then: Assume<this['_3'], unknown>,
  ) => IfCovers<typeof x, typeof y, typeof then, Else>;
}
export interface IfCovers$$$$ extends HKT4 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
    then: Assume<this['_3'], unknown>,
    else_: Assume<this['_4'], unknown>,
  ) => IfCovers<typeof x, typeof y, typeof then, typeof else_>;
}

export type All<AS extends readonly Bool[]> = AS extends readonly [
  infer Head,
  ...infer Tail,
]
  ? Head extends True
    ? // @ts-expect-error - TS doesn't know `Tail` is a tuple
      All<Tail>
    : False
  : True;
export interface All$ extends HKT1 {
  new: (x: Assume<this['_1'], readonly Bool[]>) => All<typeof x>;
}

export type None<AS extends readonly Bool[]> = AS extends readonly [
  infer Head,
  ...infer Tail,
]
  ? Head extends False
    ? // @ts-expect-error - TS doesn't know `Tail` is a tuple
      None<Tail>
    : False
  : True;
export interface None$ extends HKT1 {
  new: (x: Assume<this['_1'], readonly Bool[]>) => None<typeof x>;
}

export type Any<AS extends readonly Bool[]> = AS extends readonly [
  infer Head,
  ...infer Tail,
]
  ? Head extends True
    ? True
    : // @ts-expect-error - TS doesn't know `Tail` is a tuple
      Any<Tail>
  : False;
export interface Any$ extends HKT1 {
  new: (x: Assume<this['_1'], readonly Bool[]>) => Any<typeof x>;
}

export type And1<A extends Bool> = A;
export interface And1$ extends HKT1 {
  new: (a: Assume<this['_1'], Bool>) => And1<typeof a>;
}
export type And2<A extends Bool, B extends Bool> = A extends True ? B : False;
export interface And2$<B extends Bool> extends HKT1 {
  new: (a: Assume<this['_1'], Bool>) => And2<typeof a, B>;
}
export interface And2$$ extends HKT2 {
  new: (
    a: Assume<this['_1'], Bool>,
    b: Assume<this['_2'], Bool>,
  ) => And2<typeof a, typeof b>;
}
export type And3<
  A extends Bool,
  B extends Bool,
  C extends Bool,
> = A extends True ? (B extends True ? C : False) : False;
export interface And3$<B extends Bool, C extends Bool> extends HKT1 {
  new: (a: Assume<this['_1'], Bool>) => And3<typeof a, B, C>;
}
export interface And3$$<C extends Bool> extends HKT2 {
  new: (
    a: Assume<this['_1'], Bool>,
    b: Assume<this['_2'], Bool>,
  ) => And3<typeof a, typeof b, C>;
}
export interface And3$$$ extends HKT3 {
  new: (
    a: Assume<this['_1'], Bool>,
    b: Assume<this['_2'], Bool>,
    c: Assume<this['_3'], Bool>,
  ) => And3<typeof a, typeof b, typeof c>;
}

export type Path<T extends Str | List> = T extends Str
  ? List.ToReadonly<_ParsePath<T>>
  : T;
type _ParsePath<
  S extends Str,
  Prev extends Str = '',
  PrevChar extends Str = '',
  InString extends Bool = False,
  StringQuote extends "'" | '"' = "'",
  Result extends List<Str> = [],
> = S extends `${infer L}${infer R}`
  ? InString extends True
    ? L extends '\\'
      ? PrevChar extends '\\'
        ? _ParsePath<R, `${Prev}${L}`, L, True, StringQuote, Result>
        : _ParsePath<R, Prev, L, True, StringQuote, Result>
      : L extends StringQuote
      ? PrevChar extends '\\'
        ? _ParsePath<R, `${Prev}${L}`, L, True, StringQuote, Result>
        : _ParsePath<R, '', L, False, StringQuote, _AppendPrev<Result, Prev>>
      : _ParsePath<R, `${Prev}${L}`, L, True, StringQuote, Result>
    : L extends "'" | '"'
    ? PrevChar extends '['
      ? _ParsePath<R, '', L, True, L, Result>
      : _ParsePath<R, '', L, True, L, _AppendPrev<Result, Prev>>
    : L extends '['
    ? _ParsePath<R, '', L, False, StringQuote, _AppendPrev<Result, Prev>>
    : L extends ']'
    ? PrevChar extends "'" | '"'
      ? _ParsePath<R, '', L, False, StringQuote, Result>
      : _ParsePath<R, '', L, False, StringQuote, _AppendPrev<Result, Prev>>
    : L extends '.'
    ? _ParsePath<R, '', L, False, StringQuote, _AppendPrev<Result, Prev>>
    : _ParsePath<R, `${Prev}${L}`, L, False, StringQuote, Result>
  : _AppendPrev<Result, Prev>;
type _AppendPrev<AS extends List<Str>, S extends Str> = S extends ''
  ? AS
  : [...AS, S];
