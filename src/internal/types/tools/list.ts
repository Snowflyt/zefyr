import type { Ary } from './ary';
import type { False, True } from './bool';
import type { Identity$, If, Ifp, Repeat } from './common';
import type { Apply1, Apply2, Assume, HKT1, HKT2, HKT3 } from './hkt';
import type { Int, Nat, Num } from './num';

export type List<T = unknown> = readonly T[];
export type IsList<T> = T extends List ? (Num extends T['length'] ? False : True) : False;
export interface IsList$ extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IsList<typeof x>;
}
export type IfList<T, Then, Else> = If<IsList<T>, Then, Else>;
export interface IfList$<Then, Else> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IfList<typeof x, Then, Else>;
}
export interface IfList$$<Else> extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
  ) => IfList<typeof x, typeof y, Else>;
}
export interface IfList$$$ extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    y: Assume<this['_2'], unknown>,
    z: Assume<this['_3'], unknown>,
  ) => IfList<typeof x, typeof y, typeof z>;
}
export type IfpList<T, ThenFn extends HKT1, ElseFn extends HKT1> = Ifp<T, IsList$, ThenFn, ElseFn>;
export interface IfpList$<ThenFn extends HKT1, ElseFn extends HKT1> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IfpList<typeof x, ThenFn, ElseFn>;
}
export interface IfpList$$<ElseFn extends HKT1> extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    pred: Assume<this['_2'], HKT1>,
  ) => IfpList<typeof x, typeof pred, ElseFn>;
}
export interface IfpList$$$ extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    pred: Assume<this['_2'], HKT1>,
    thenFn: Assume<this['_3'], HKT1>,
  ) => IfpList<typeof x, typeof pred, typeof thenFn>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace List {
  type Empty = readonly [];

  type ToWritable<AS extends List> = [...AS];
  interface ToWritable$ extends HKT1 {
    new: (as: Assume<this['_1'], List>) => ToWritable<typeof as>;
  }
  type ToReadonly<AS extends List> = readonly [...AS];
  interface ToReadonly$ extends HKT1 {
    new: (as: Assume<this['_1'], List>) => ToReadonly<typeof as>;
  }

  type Of1<A> = readonly [A];
  interface Of1$ extends HKT1 {
    new: (a: Assume<this['_1'], unknown>) => Of1<typeof a>;
  }
  type Of2<A, B> = readonly [A, B];
  interface Of2$<B> extends HKT1 {
    new: (a: Assume<this['_1'], unknown>) => Of2<typeof a, B>;
  }
  interface Of2$$ extends HKT2 {
    new: (
      a: Assume<this['_1'], unknown>,
      b: Assume<this['_2'], unknown>,
    ) => Of2<typeof a, typeof b>;
  }
  type Of3<A, B, C> = readonly [A, B, C];
  interface Of3$<B, C> extends HKT1 {
    new: (a: Assume<this['_1'], unknown>) => Of3<typeof a, B, C>;
  }
  interface Of3$$<C> extends HKT2 {
    new: (
      a: Assume<this['_1'], unknown>,
      b: Assume<this['_2'], unknown>,
    ) => Of3<typeof a, typeof b, C>;
  }
  interface Of3$$$ extends HKT3 {
    new: (
      a: Assume<this['_1'], unknown>,
      b: Assume<this['_2'], unknown>,
      c: Assume<this['_3'], unknown>,
    ) => Of3<typeof a, typeof b, typeof c>;
  }
  type Of4<A, B, C, D> = readonly [A, B, C, D];
  interface Of4$<B, C, D> extends HKT1 {
    new: (a: Assume<this['_1'], unknown>) => Of4<typeof a, B, C, D>;
  }
  interface Of4$$<C, D> extends HKT2 {
    new: (
      a: Assume<this['_1'], unknown>,
      b: Assume<this['_2'], unknown>,
    ) => Of4<typeof a, typeof b, C, D>;
  }
  interface Of4$$$<D> extends HKT3 {
    new: (
      a: Assume<this['_1'], unknown>,
      b: Assume<this['_2'], unknown>,
      c: Assume<this['_3'], unknown>,
    ) => Of4<typeof a, typeof b, typeof c, D>;
  }
  type Of5<A, B, C, D, E> = readonly [A, B, C, D, E];
  interface Of5$<B, C, D, E> extends HKT1 {
    new: (a: Assume<this['_1'], unknown>) => Of5<typeof a, B, C, D, E>;
  }
  interface Of5$$<C, D, E> extends HKT2 {
    new: (
      a: Assume<this['_1'], unknown>,
      b: Assume<this['_2'], unknown>,
    ) => Of5<typeof a, typeof b, C, D, E>;
  }
  interface Of5$$$<D, E> extends HKT3 {
    new: (
      a: Assume<this['_1'], unknown>,
      b: Assume<this['_2'], unknown>,
      c: Assume<this['_3'], unknown>,
    ) => Of5<typeof a, typeof b, typeof c, D, E>;
  }
  type Of6<A, B, C, D, E, F> = readonly [A, B, C, D, E, F];
  interface Of6$<B, C, D, E, F> extends HKT1 {
    new: (a: Assume<this['_1'], unknown>) => Of6<typeof a, B, C, D, E, F>;
  }
  interface Of6$$<C, D, E, F> extends HKT2 {
    new: (
      a: Assume<this['_1'], unknown>,
      b: Assume<this['_2'], unknown>,
    ) => Of6<typeof a, typeof b, C, D, E, F>;
  }
  interface Of6$$$<D, E, F> extends HKT3 {
    new: (
      a: Assume<this['_1'], unknown>,
      b: Assume<this['_2'], unknown>,
      c: Assume<this['_3'], unknown>,
    ) => Of6<typeof a, typeof b, typeof c, D, E, F>;
  }
  type Of7<A, B, C, D, E, F, G> = readonly [A, B, C, D, E, F, G];
  interface Of7$<B, C, D, E, F, G> extends HKT1 {
    new: (a: Assume<this['_1'], unknown>) => Of7<typeof a, B, C, D, E, F, G>;
  }
  interface Of7$$<C, D, E, F, G> extends HKT2 {
    new: (
      a: Assume<this['_1'], unknown>,
      b: Assume<this['_2'], unknown>,
    ) => Of7<typeof a, typeof b, C, D, E, F, G>;
  }
  interface Of7$$$<D, E, F, G> extends HKT3 {
    new: (
      a: Assume<this['_1'], unknown>,
      b: Assume<this['_2'], unknown>,
      c: Assume<this['_3'], unknown>,
    ) => Of7<typeof a, typeof b, typeof c, D, E, F, G>;
  }
  type Of8<A, B, C, D, E, F, G, H> = readonly [A, B, C, D, E, F, G, H];
  interface Of8$<B, C, D, E, F, G, H> extends HKT1 {
    new: (a: Assume<this['_1'], unknown>) => Of8<typeof a, B, C, D, E, F, G, H>;
  }
  interface Of8$$<C, D, E, F, G, H> extends HKT2 {
    new: (
      a: Assume<this['_1'], unknown>,
      b: Assume<this['_2'], unknown>,
    ) => Of8<typeof a, typeof b, C, D, E, F, G, H>;
  }
  interface Of8$$$<D, E, F, G, H> extends HKT3 {
    new: (
      a: Assume<this['_1'], unknown>,
      b: Assume<this['_2'], unknown>,
      c: Assume<this['_3'], unknown>,
    ) => Of8<typeof a, typeof b, typeof c, D, E, F, G, H>;
  }

  type Map<AS extends List, F extends HKT1> = {
    [P in keyof AS]: Apply1<F, AS[P]>;
  };
  interface Map$<F extends HKT1> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Map<typeof as, F>;
  }
  interface Map$$ extends HKT2 {
    new: (as: Assume<this['_1'], List>, f: Assume<this['_2'], HKT1>) => Map<typeof as, typeof f>;
  }

  type FlatMap<AS extends List, F extends HKT1> = Apply1<
    Ary.IfWritable<AS, ToWritable$, Identity$>,
    AS extends readonly [infer Head, ...infer Tail]
      ? // @ts-expect-error - A rest element type must be an array type
        readonly [...Apply1<F, Head>, ...FlatMap<Tail, F>]
      : readonly []
  >;
  interface FlatMap$<F extends HKT1> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => FlatMap<typeof as, F>;
  }
  interface FlatMap$$ extends HKT2 {
    new: (
      as: Assume<this['_1'], List>,
      f: Assume<this['_2'], HKT1>,
    ) => FlatMap<typeof as, typeof f>;
  }

  type Filter<AS extends List, F extends HKT1> = Apply1<
    Ary.IfWritable<AS, ToWritable$, Identity$>,
    AS extends readonly [infer Head, ...infer Tail]
      ? Apply1<F, Head> extends True
        ? readonly [Head, ...Filter<Tail, F>]
        : Filter<ToReadonly<Tail>, F>
      : readonly []
  >;
  interface Filter$<F extends HKT1> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Filter<typeof as, F>;
  }
  interface Filter$$ extends HKT2 {
    new: (as: Assume<this['_1'], List>, f: Assume<this['_2'], HKT1>) => Filter<typeof as, typeof f>;
  }

  type Reject<AS extends List, F extends HKT1> = Apply1<
    Ary.IfWritable<AS, ToWritable$, Identity$>,
    AS extends readonly [infer Head, ...infer Tail]
      ? Apply1<F, Head> extends True
        ? Reject<ToReadonly<Tail>, F>
        : readonly [Head, ...Reject<Tail, F>]
      : readonly []
  >;
  interface Reject$<F extends HKT1> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Reject<typeof as, F>;
  }
  interface Reject$$ extends HKT2 {
    new: (as: Assume<this['_1'], List>, f: Assume<this['_2'], HKT1>) => Reject<typeof as, typeof f>;
  }

  type Reduce<AS extends List, F extends HKT2, Z> = AS extends readonly [infer Head, ...infer Tail]
    ? Reduce<Tail, F, Apply2<F, Z, Head>>
    : Z;
  interface Reduce$<F extends HKT2, Z> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Reduce<typeof as, F, Z>;
  }
  interface Reduce$$<Z> extends HKT2 {
    new: (
      as: Assume<this['_1'], List>,
      f: Assume<this['_2'], HKT2>,
    ) => Reduce<typeof as, typeof f, Z>;
  }

  type Append<AS extends List, T> = Apply1<Ary.IfReadonly<AS, ToReadonly$, Identity$>, [...AS, T]>;
  interface Append$<T> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Append<typeof as, T>;
  }
  interface Append$$ extends HKT2 {
    new: (
      as: Assume<this['_1'], List>,
      x: Assume<this['_2'], unknown>,
    ) => Append<typeof as, typeof x>;
  }

  type Prepend<AS extends List, T> = Apply1<Ary.IfReadonly<AS, ToReadonly$, Identity$>, [T, ...AS]>;
  interface Prepend$<T> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Prepend<typeof as, T>;
  }
  interface Prepend$$ extends HKT2 {
    new: (
      as: Assume<this['_1'], List>,
      x: Assume<this['_2'], unknown>,
    ) => Prepend<typeof as, typeof x>;
  }

  type Concat<AS extends List, BS extends List> = Apply1<
    Ary.IfReadonly<AS, ToReadonly$, Identity$>,
    [...AS, ...BS]
  >;
  interface Concat$<BS extends List> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Concat<typeof as, BS>;
  }
  interface Concat$$ extends HKT2 {
    new: (
      as: Assume<this['_1'], List>,
      bs: Assume<this['_2'], List>,
    ) => Concat<typeof as, typeof bs>;
  }

  type Take<AS extends List, N extends Nat> = Apply1<
    Ary.IfWritable<AS, ToWritable$, Identity$>,
    AS extends readonly [infer Head, ...infer Tail]
      ? N extends 0
        ? readonly []
        : readonly [Head, ...Take<Tail, Int.Dec<N>>]
      : readonly []
  >;
  interface Take$<N extends Nat> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Take<typeof as, N>;
  }
  interface Take$$ extends HKT2 {
    new: (as: Assume<this['_1'], List>, n: Assume<this['_2'], Nat>) => Take<typeof as, typeof n>;
  }

  type TakeUntil<AS extends List, F extends HKT1> = Apply1<
    Ary.IfWritable<AS, ToWritable$, Identity$>,
    AS extends readonly [infer Head, ...infer Tail]
      ? Apply1<F, Head> extends True
        ? readonly []
        : readonly [Head, ...TakeUntil<Tail, F>]
      : readonly []
  >;
  interface TakeUntil$<F extends HKT1> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => TakeUntil<typeof as, F>;
  }
  interface TakeUntil$$ extends HKT2 {
    new: (
      as: Assume<this['_1'], List>,
      f: Assume<this['_2'], HKT1>,
    ) => TakeUntil<typeof as, typeof f>;
  }

  type Drop<AS extends List, N extends Nat> = Apply1<
    Ary.IfReadonly<AS, ToReadonly$, Identity$>,
    AS extends readonly [unknown, ...infer Tail] ? (N extends 0 ? AS : Drop<Tail, Int.Dec<N>>) : []
  >;
  interface Drop$<N extends Nat> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Drop<typeof as, N>;
  }
  interface Drop$$ extends HKT2 {
    new: (as: Assume<this['_1'], List>, n: Assume<this['_2'], Nat>) => Drop<typeof as, typeof n>;
  }

  type DropIndex<AS extends List, I extends Nat> = Apply1<
    Ary.IfWritable<AS, ToWritable$, Identity$>,
    I extends 0
      ? AS extends readonly [unknown, ...infer Tail]
        ? ToReadonly<Tail>
        : AS
      : AS extends readonly [infer Head, ...infer Tail]
      ? readonly [Head, ...DropIndex<Tail, Int.Dec<I>>]
      : AS
  >;
  interface DropIndex$<I extends Nat> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => DropIndex<typeof as, I>;
  }
  interface DropIndex$$ extends HKT2 {
    new: (
      as: Assume<this['_1'], List>,
      i: Assume<this['_2'], Nat>,
    ) => DropIndex<typeof as, typeof i>;
  }

  type DropUntil<AS extends List, F extends HKT1> = Apply1<
    Ary.IfReadonly<AS, ToReadonly$, Identity$>,
    AS extends readonly [infer Head, ...infer Tail]
      ? Apply1<F, Head> extends True
        ? AS
        : DropUntil<Tail, F>
      : []
  >;
  interface DropUntil$<F extends HKT1> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => DropUntil<typeof as, F>;
  }
  interface DropUntil$$ extends HKT2 {
    new: (
      as: Assume<this['_1'], List>,
      f: Assume<this['_2'], HKT1>,
    ) => DropUntil<typeof as, typeof f>;
  }

  type Every<AS extends List, F extends HKT1> = AS extends readonly [infer Head, ...infer Tail]
    ? Apply1<F, Head> extends True
      ? Every<Tail, F>
      : False
    : True;
  interface Every$<F extends HKT1> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Every<typeof as, F>;
  }
  interface Every$$ extends HKT2 {
    new: (as: Assume<this['_1'], List>, f: Assume<this['_2'], HKT1>) => Every<typeof as, typeof f>;
  }

  type NoneMatch<AS extends List, F extends HKT1> = AS extends readonly [infer Head, ...infer Tail]
    ? Apply1<F, Head> extends True
      ? False
      : NoneMatch<Tail, F>
    : True;
  interface NoneMatch$<F extends HKT1> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => NoneMatch<typeof as, F>;
  }
  interface NoneMatch$$ extends HKT2 {
    new: (
      as: Assume<this['_1'], List>,
      f: Assume<this['_2'], HKT1>,
    ) => NoneMatch<typeof as, typeof f>;
  }

  type Some<AS extends List, F extends HKT1> = AS extends readonly [infer Head, ...infer Tail]
    ? Apply1<F, Head> extends True
      ? True
      : Apply1<F, Head> | Some<Tail, F>
    : False;
  interface Some$<F extends HKT1> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Some<typeof as, F>;
  }
  interface Some$$ extends HKT2 {
    new: (as: Assume<this['_1'], List>, f: Assume<this['_2'], HKT1>) => Some<typeof as, typeof f>;
  }

  type With<AS extends List, I extends Nat, T> = Apply1<
    Ary.IfWritable<AS, ToWritable$, Identity$>,
    AS extends readonly [infer Head, ...infer Tail]
      ? I extends 0
        ? readonly [T, ...Tail]
        : readonly [Head, ...With<Tail, Int.Dec<I>, T>]
      : I extends -1
      ? readonly []
      : [...Repeat<undefined, I>, T]
  >;
  interface With$<I extends Nat, T> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => With<typeof as, I, T>;
  }
  interface With$$<T> extends HKT2 {
    new: (as: Assume<this['_1'], List>, i: Assume<this['_2'], Nat>) => With<typeof as, typeof i, T>;
  }
  interface With$$$ extends HKT3 {
    new: (
      as: Assume<this['_1'], List>,
      i: Assume<this['_2'], Nat>,
      x: Assume<this['_3'], unknown>,
    ) => With<typeof as, typeof i, typeof x>;
  }

  type Mutate<AS extends List, BS extends List> = Apply1<
    Ary.IfReadonly<AS, ToReadonly$, Identity$>,
    BS
  >;
  interface Mutate$<BS extends List> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Mutate<typeof as, BS>;
  }
  interface Mutate$$ extends HKT2 {
    new: (
      as: Assume<this['_1'], List>,
      bs: Assume<this['_2'], List>,
    ) => Mutate<typeof as, typeof bs>;
  }

  type Length<AS extends List> = AS['length'];
  interface Length$ extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Length<typeof as>;
  }

  type Get<AS extends List, I extends Nat> = AS extends readonly [
    infer Head extends AS[0],
    ...infer Tail,
  ]
    ? I extends 0
      ? Head
      : Get<Tail, Int.Dec<I>>
    : never;
  interface Get$<I extends Nat> extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Get<typeof as, I>;
  }
  interface Get$$ extends HKT2 {
    new: (as: Assume<this['_1'], List>, i: Assume<this['_2'], Nat>) => Get<typeof as, typeof i>;
  }

  type Head<AS extends List> = AS extends readonly [infer Head extends AS[0], ...unknown[]]
    ? Head
    : never;
  interface Head$ extends HKT1 {
    new: (as: Assume<this['_1'], List>) => Head<typeof as>;
  }
}
