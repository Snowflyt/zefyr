import type { True } from '.';
import type { Ary } from './ary';
import type { And2, Covers$, Extends, If, Ifp, Yield1$ } from './common';
import type {
  Apply1,
  Assume,
  Flow2,
  HKT1,
  HKT2,
  HKT3,
  HKT4,
  Pipe1,
  Pipe2,
} from './hkt';
import type { IfpList, IfpList$, List } from './list';
import type { Int, Num } from './num';

export type Obj = object;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Obj {
  export type KeyOf<O> = keyof O;
  export interface KeyOf$ extends HKT1 {
    new: (o: Assume<this['_1'], unknown>) => KeyOf<typeof o>;
  }
  export type KeyOfNullish<O> = keyof Exclude<O, Nullish>;
  export interface KeyOfNullish$ extends HKT1 {
    new: (o: Assume<this['_1'], unknown>) => KeyOfNullish<typeof o>;
  }

  export type WritableDeep<O> = _Id<{
    -readonly [K in keyof O]: O[K] extends object ? WritableDeep<O[K]> : O[K];
  }>;

  export type ValueOf<O> = O[keyof O];
  export interface ValueOf$ extends HKT1 {
    new: (o: Assume<this['_1'], unknown>) => ValueOf<typeof o>;
  }
  export type ValueOfNullish<O> = Exclude<O, Nullish>[keyof Exclude<
    O,
    Nullish
  >];
  export interface ValueOfNullish$ extends HKT1 {
    new: (o: Assume<this['_1'], unknown>) => ValueOfNullish<typeof o>;
  }

  export type OptionalKeyOf<O> = {
    [K in keyof O]-?: NonNullable<unknown> extends { [P in K]: O[K] }
      ? K
      : never;
  }[keyof O];
  export interface OptionalKeyOf$ extends HKT1 {
    new: (o: Assume<this['_1'], Obj>) => OptionalKeyOf<typeof o>;
  }

  type _SpreadProperties<L, R, K extends keyof L & keyof R> = {
    [P in K]: L[P] | Exclude<R[P], undefined>;
  };
  type _Id<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
  type _SpreadTwo<L, R> = _Id<
    Pick<L, Exclude<keyof L, keyof R>> &
      Pick<R, Exclude<keyof R, OptionalKeyOf<R>>> &
      Pick<R, Exclude<OptionalKeyOf<R>, keyof L>> &
      _SpreadProperties<L, R, OptionalKeyOf<R> & keyof L>
  >;
  export type Spread<AS extends List> = AS extends [infer Head, ...infer Tail]
    ? _SpreadTwo<Head, Spread<Tail>>
    : unknown;
  export interface Spread$ extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Spread<typeof as>;
  }
  export type Merge1<O1> = O1;
  export interface Merge1$ extends HKT1 {
    new: (o1: Assume<this['_1'], Obj>) => Merge1<typeof o1>;
  }
  export type Merge2<O1, O2> = _SpreadTwo<O1, O2>;
  export interface Merge2$<O2> extends HKT1 {
    new: (o1: Assume<this['_1'], Obj>) => Merge2<typeof o1, O2>;
  }
  export interface Merge2$$ extends HKT2 {
    new: (
      o1: Assume<this['_1'], Obj>,
      o2: Assume<this['_2'], Obj>,
    ) => Merge2<typeof o1, typeof o2>;
  }
  export type Merge3<O1, O2, O3> = _SpreadTwo<_SpreadTwo<O1, O2>, O3>;
  export interface Merge3$<O2, O3> extends HKT1 {
    new: (o1: Assume<this['_1'], Obj>) => Merge3<typeof o1, O2, O3>;
  }
  export interface Merge3$$<O3> extends HKT2 {
    new: (
      o1: Assume<this['_1'], Obj>,
      o2: Assume<this['_2'], Obj>,
    ) => Merge3<typeof o1, typeof o2, O3>;
  }
  export interface Merge3$$$ extends HKT3 {
    new: (
      o1: Assume<this['_1'], Obj>,
      o2: Assume<this['_2'], Obj>,
      o3: Assume<this['_3'], Obj>,
    ) => Merge3<typeof o1, typeof o2, typeof o3>;
  }

  export type BuildNested<P extends List<PropertyKey>, V> = P extends readonly [
    infer Head,
    ...infer Tail,
  ]
    ? // @ts-expect-error - TS doesn't know `Head` is a `PropertyKey` and `Tail` is a `List<PropertyKey>`
      { [P in Head]: BuildNested<Tail, V> }
    : V;
  export interface BuildNested$<V> extends HKT1 {
    new: (p: Assume<this['_1'], List<PropertyKey>>) => BuildNested<typeof p, V>;
  }
  export interface BuildNested$$ extends HKT2 {
    new: (
      p: Assume<this['_1'], List<PropertyKey>>,
      v: Assume<this['_2'], unknown>,
    ) => BuildNested<typeof p, typeof v>;
  }

  export type Get<O, K extends PropertyKey | List<PropertyKey>> = And2<
    Extends<Exclude<O, Nullish>, Ary>,
    Num.IsNat<K>
  > extends True
    ? Pipe1<O, IfpList$<List.Get$<Int.Of<K>>, Ary.ElemOrUndefined$>>
    : K extends keyof Exclude<O, Nullish>
    ? Exclude<O, Nullish>[K] | Exclude<O, Exclude<O, Nullish>>
    : K extends List<PropertyKey>
    ? Pipe1<K, List.Reduce$<Get$$, O>>
    : never;
  export interface Get$<K extends PropertyKey | List<PropertyKey>>
    extends HKT1 {
    new: (o: Assume<this['_1'], unknown>) => Get<typeof o, K>;
  }
  export interface Get$$ extends HKT2 {
    new: (
      o: Assume<this['_1'], unknown>,
      k: Assume<this['_2'], PropertyKey | List<PropertyKey>>,
    ) => Get<typeof o, typeof k>;
  }

  export type KeyContains<O, K> = Pipe2<O, KeyOf$, Covers$<K>>;
  export interface KeyContains$<K> extends HKT1 {
    new: (o: Assume<this['_1'], unknown>) => KeyContains<typeof o, K>;
  }
  export interface KeyContains$$ extends HKT2 {
    new: (
      o: Assume<this['_1'], unknown>,
      k: Assume<this['_2'], unknown>,
    ) => KeyContains<typeof o, typeof k>;
  }
  export type IfKeyContains<O, K, Then, Else> = If<
    KeyContains<O, K>,
    Then,
    Else
  >;
  export interface IfKeyContains$<K, Then, Else> extends HKT1 {
    new: (
      o: Assume<this['_1'], unknown>,
    ) => IfKeyContains<typeof o, K, Then, Else>;
  }
  export interface IfKeyContains$$<Then, Else> extends HKT2 {
    new: (
      o: Assume<this['_1'], unknown>,
      k: Assume<this['_2'], unknown>,
    ) => IfKeyContains<typeof o, typeof k, Then, Else>;
  }
  export interface IfKeyContains$$$<Else> extends HKT3 {
    new: (
      o: Assume<this['_1'], unknown>,
      k: Assume<this['_2'], unknown>,
      then: Assume<this['_3'], unknown>,
    ) => IfKeyContains<typeof o, typeof k, typeof then, Else>;
  }
  export interface IfKeyContains$$$$ extends HKT4 {
    new: (
      o: Assume<this['_1'], unknown>,
      k: Assume<this['_2'], unknown>,
      then: Assume<this['_3'], unknown>,
      else_: Assume<this['_4'], unknown>,
    ) => IfKeyContains<typeof o, typeof k, typeof then, typeof else_>;
  }
  export type IfpKeyContains<
    O,
    K,
    ThenFn extends HKT1,
    ElseFn extends HKT1,
  > = KeyContains<O, K> extends True ? Apply1<ThenFn, O> : Apply1<ElseFn, O>;
  export interface IfpKeyContains$<K, ThenFn extends HKT1, ElseFn extends HKT1>
    extends HKT1 {
    new: (
      o: Assume<this['_1'], unknown>,
    ) => IfpKeyContains<typeof o, K, ThenFn, ElseFn>;
  }
  export interface IfpKeyContains$$<ThenFn extends HKT1, ElseFn extends HKT1>
    extends HKT2 {
    new: (
      o: Assume<this['_1'], unknown>,
      k: Assume<this['_2'], unknown>,
    ) => IfpKeyContains<typeof o, typeof k, ThenFn, ElseFn>;
  }
  export interface IfpKeyContains$$$<ElseFn extends HKT1> extends HKT3 {
    new: (
      o: Assume<this['_1'], unknown>,
      k: Assume<this['_2'], unknown>,
      thenFn: Assume<this['_3'], HKT1>,
    ) => IfpKeyContains<typeof o, typeof k, typeof thenFn, ElseFn>;
  }
  export interface IfpKeyContains$$$$ extends HKT4 {
    new: (
      o: Assume<this['_1'], unknown>,
      k: Assume<this['_2'], unknown>,
      thenFn: Assume<this['_3'], HKT1>,
      elseFn: Assume<this['_4'], HKT1>,
    ) => IfpKeyContains<typeof o, typeof k, typeof thenFn, typeof elseFn>;
  }
  export type OptionalKeyContains<O, K> = Pipe2<O, OptionalKeyOf$, Covers$<K>>;
  export interface OptionalKeyContains$<K> extends HKT1 {
    new: (o: Assume<this['_1'], unknown>) => OptionalKeyContains<typeof o, K>;
  }
  export interface OptionalKeyContains$$ extends HKT2 {
    new: (
      o: Assume<this['_1'], unknown>,
      k: Assume<this['_2'], PropertyKey>,
    ) => OptionalKeyContains<typeof o, typeof k>;
  }

  type _Set<O, K, V> = And2<Extends<O, Ary>, Num.IsNat<K>> extends True
    ? Pipe1<O, IfpList$<List.With$<Int.Of<K>, V>, Ary.Mix$<V>>>
    : K extends PropertyKey
    ? O extends Ary
      ? O & { [P in K]: V }
      : Merge2<O, { [P in K]: V }>
    : O;
  type _With__Step<O, P extends List<PropertyKey>> = Ifp<
    O,
    KeyContains$<List.Head<P>>,
    Get$<List.Head<P>>,
    Yield1$<_With__GenerateDefault<List.Get<P, 1>>>
  >;
  type _With__GenerateDefault<K> = Num.IfNat<K, [], NonNullable<unknown>>;
  export type With<
    O,
    K extends PropertyKey | List<PropertyKey>,
    V,
  > = K extends PropertyKey
    ? _Set<O, K, V>
    : K extends List<PropertyKey>
    ? K extends readonly [infer Head]
      ? _Set<O, Head, V>
      : K extends readonly [
          infer Head extends PropertyKey,
          ...infer T extends List<PropertyKey>,
        ]
      ? List.ToReadonly<T> extends infer Tail extends List<PropertyKey>
        ? And2<Extends<O, Ary>, Num.IsNat<Head>> extends True
          ? IfpList<
              O,
              List.With$<Int.Of<Head>, With<_With__Step<O, K>, Tail, V>>,
              Ary.Mutate$<
                And2<
                  Extends<With<_With__Step<O, K>, Tail, V>, object>,
                  Extends<Pipe1<O, Ary.Elem$>, Obj>
                > extends True
                  ? Merge2<
                      Pipe1<O, Ary.Elem$>,
                      With<_With__Step<O, K>, Tail, V>
                    >
                  : Pipe1<O, Ary.Elem$> | With<_With__Step<O, K>, Tail, V>
              >
            >
          : O extends Ary
          ? O &
              If<
                OptionalKeyContains<O, Head>,
                { [P in Head]?: With<NonNullable<Get<O, Head>>, Tail, V> },
                { [P in Head]: With<_With__Step<O, K>, Tail, V> }
              >
          : Ifp<
              O,
              OptionalKeyContains$<Head>,
              Flow2<
                Omit$<Head>,
                Merge2$<{
                  [P in Head]: Union2<
                    With<NonNullable<Get<O, Head>>, Tail, V>,
                    With<_With__GenerateDefault<List.Head<Tail>>, Tail, V>
                  >;
                }>
              >,
              Merge2$<{ [P in Head]: With<_With__Step<O, K>, Tail, V> }>
            >
        : never
      : O
    : never;
  export interface With$<K extends PropertyKey | List<PropertyKey>, V>
    extends HKT1 {
    new: (o: Assume<this['_1'], unknown>) => With<typeof o, K, V>;
  }
  export interface With$$<V> extends HKT2 {
    new: (
      o: Assume<this['_1'], unknown>,
      k: Assume<this['_2'], PropertyKey | List<PropertyKey>>,
    ) => With<typeof o, typeof k, V>;
  }
  export interface With$$$ extends HKT3 {
    new: (
      o: Assume<this['_1'], unknown>,
      k: Assume<this['_2'], PropertyKey | List<PropertyKey>>,
      v: Assume<this['_3'], unknown>,
    ) => With<typeof o, typeof k, typeof v>;
  }

  export type Omit<O, K> = { [P in Exclude<keyof O, K>]: O[P] };
  export interface Omit$<K> extends HKT1 {
    new: (o: Assume<this['_1'], unknown>) => Omit<typeof o, K>;
  }
  export interface Omit$$ extends HKT2 {
    new: (
      o: Assume<this['_1'], unknown>,
      k: Assume<this['_2'], unknown>,
    ) => Omit<typeof o, typeof k>;
  }

  export type Union2<O1, O2> = _Id<
    {
      [K in keyof O1 & keyof O2]: If<
        And2<Extends<O1[K], object>, Extends<O2[K], object>>,
        Union2<O1[K], O2[K]>,
        O1[K] | O2[K]
      >;
    } & { [K in Exclude<keyof O1, keyof O1 & keyof O2>]?: O1[K] } & {
      [K in Exclude<keyof O2, keyof O1 & keyof O2>]?: O2[K];
    }
  >;
  export interface Union2$<O2> extends HKT1 {
    new: (o1: Assume<this['_1'], unknown>) => Union2<typeof o1, O2>;
  }
  export interface Union2$$ extends HKT2 {
    new: (
      o1: Assume<this['_1'], unknown>,
      o2: Assume<this['_2'], unknown>,
    ) => Union2<typeof o1, typeof o2>;
  }
}
