type GenericFunction = (...x: never[]) => unknown;

export abstract class HKT1 {
  readonly _1?: unknown;
  // @ts-expect-error - Property 'new' has no initializer and is not definitely assigned in the constructor
  new: GenericFunction;
}
export abstract class HKT2 {
  readonly _1?: unknown;
  readonly _2?: unknown;
  // @ts-expect-error - Property 'new' has no initializer and is not definitely assigned in the constructor
  new: GenericFunction;
}
export abstract class HKT3 {
  readonly _1?: unknown;
  readonly _2?: unknown;
  readonly _3?: unknown;
  // @ts-expect-error - Property 'new' has no initializer and is not definitely assigned in the constructor
  new: GenericFunction;
}
export abstract class HKT4 {
  readonly _1?: unknown;
  readonly _2?: unknown;
  readonly _3?: unknown;
  readonly _4?: unknown;
  // @ts-expect-error - Property 'new' has no initializer and is not definitely assigned in the constructor
  new: GenericFunction;
}

export type Assume<T, U> = T extends U ? T : U;

export type Apply1<F extends HKT1, _1> = ReturnType<
  (F & {
    readonly _1: _1;
  })['new']
>;
export interface Apply1$<_1> extends HKT1 {
  new: (f: Assume<this['_1'], HKT1>) => Apply1<typeof f, _1>;
}
export interface Apply1$$ extends HKT2 {
  new: (
    f: Assume<this['_1'], HKT1>,
    _1: Assume<this['_2'], unknown>,
  ) => Apply1<typeof f, typeof _1>;
}
export type Apply2<F extends HKT2, _1, _2> = ReturnType<
  (F & {
    readonly _1: _1;
    readonly _2: _2;
  })['new']
>;
export interface Apply2$<_1, _2> extends HKT1 {
  new: (f: Assume<this['_1'], HKT2>) => Apply2<typeof f, _1, _2>;
}
export interface Apply2$$<_2> extends HKT2 {
  new: (
    f: Assume<this['_1'], HKT2>,
    _1: Assume<this['_2'], unknown>,
  ) => Apply2<typeof f, typeof _1, _2>;
}
export interface Apply2$$$ extends HKT3 {
  new: (
    f: Assume<this['_1'], HKT2>,
    _1: Assume<this['_2'], unknown>,
    _2: Assume<this['_3'], unknown>,
  ) => Apply2<typeof f, typeof _1, typeof _2>;
}
export type Apply3<F extends HKT3, _1, _2, _3> = ReturnType<
  (F & {
    readonly _1: _1;
    readonly _2: _2;
    readonly _3: _3;
  })['new']
>;
export interface Apply3$<_1, _2, _3> extends HKT1 {
  new: (f: Assume<this['_1'], HKT3>) => Apply3<typeof f, _1, _2, _3>;
}
export interface Apply3$$<_2, _3> extends HKT2 {
  new: (
    f: Assume<this['_1'], HKT3>,
    _1: Assume<this['_2'], unknown>,
  ) => Apply3<typeof f, typeof _1, _2, _3>;
}
export interface Apply3$$$<_3> extends HKT3 {
  new: (
    f: Assume<this['_1'], HKT3>,
    _1: Assume<this['_2'], unknown>,
    _2: Assume<this['_3'], unknown>,
  ) => Apply3<typeof f, typeof _1, typeof _2, _3>;
}
export interface Apply3$$$$ extends HKT4 {
  new: (
    f: Assume<this['_1'], HKT3>,
    _1: Assume<this['_2'], unknown>,
    _2: Assume<this['_3'], unknown>,
    _3: Assume<this['_4'], unknown>,
  ) => Apply3<typeof f, typeof _1, typeof _2, typeof _3>;
}

export type ApplyWith1<_1, F extends HKT1> = ReturnType<
  (F & {
    readonly _1: _1;
  })['new']
>;
export interface ApplyWith1$<F extends HKT1> extends HKT1 {
  new: (_1: Assume<F['_1'], unknown>) => ApplyWith1<typeof _1, F>;
}
export interface ApplyWith1$$ extends HKT2 {
  new: (
    _1: Assume<this['_1'], unknown>,
    f: Assume<this['_2'], HKT1>,
  ) => ApplyWith1<typeof _1, typeof f>;
}
export type ApplyWith2<_1, _2, F extends HKT2> = ReturnType<
  (F & {
    readonly _1: _1;
    readonly _2: _2;
  })['new']
>;
export interface ApplyWith2$<_2, F extends HKT2> extends HKT1 {
  new: (_1: Assume<F['_1'], unknown>) => ApplyWith2<typeof _1, _2, F>;
}
export interface ApplyWith2$$<F extends HKT2> extends HKT2 {
  new: (
    _1: Assume<F['_1'], unknown>,
    _2: Assume<this['_2'], unknown>,
  ) => ApplyWith2<typeof _1, typeof _2, F>;
}
export interface ApplyWith2$$$ extends HKT3 {
  new: (
    _1: Assume<this['_1'], unknown>,
    _2: Assume<this['_2'], unknown>,
    f: Assume<this['_3'], HKT2>,
  ) => ApplyWith2<typeof _1, typeof _2, typeof f>;
}
export type ApplyWith3<_1, _2, _3, F extends HKT3> = ReturnType<
  (F & {
    readonly _1: _1;
    readonly _2: _2;
    readonly _3: _3;
  })['new']
>;
export interface ApplyWith3$<_2, _3, F extends HKT3> extends HKT1 {
  new: (_1: Assume<F['_1'], unknown>) => ApplyWith3<typeof _1, _2, _3, F>;
}
export interface ApplyWith3$$<_3, F extends HKT3> extends HKT2 {
  new: (
    _1: Assume<F['_1'], unknown>,
    _2: Assume<this['_2'], unknown>,
  ) => ApplyWith3<typeof _1, typeof _2, _3, F>;
}
export interface ApplyWith3$$$<F extends HKT3> extends HKT3 {
  new: (
    _1: Assume<F['_1'], unknown>,
    _2: Assume<this['_2'], unknown>,
    _3: Assume<this['_3'], unknown>,
  ) => ApplyWith3<typeof _1, typeof _2, typeof _3, F>;
}
export interface ApplyWith3$$$$ extends HKT4 {
  new: (
    _1: Assume<this['_1'], unknown>,
    _2: Assume<this['_2'], unknown>,
    _3: Assume<this['_3'], unknown>,
    f: Assume<this['_4'], HKT3>,
  ) => ApplyWith3<typeof _1, typeof _2, typeof _3, typeof f>;
}

export type Pipe1<T, F1 extends HKT1> = Apply1<F1, T>;
export type Pipe2<T, F1 extends HKT1, F2 extends HKT1> = Apply1<F2, Apply1<F1, T>>;
export type Pipe3<T, F1 extends HKT1, F2 extends HKT1, F3 extends HKT1> = Apply1<
  F3,
  Apply1<F2, Apply1<F1, T>>
>;
export type Pipe4<T, F1 extends HKT1, F2 extends HKT1, F3 extends HKT1, F4 extends HKT1> = Apply1<
  F4,
  Apply1<F3, Apply1<F2, Apply1<F1, T>>>
>;
export type Pipe5<
  T,
  F1 extends HKT1,
  F2 extends HKT1,
  F3 extends HKT1,
  F4 extends HKT1,
  F5 extends HKT1,
> = Apply1<F5, Apply1<F4, Apply1<F3, Apply1<F2, Apply1<F1, T>>>>>;
export type Pipe6<
  T,
  F1 extends HKT1,
  F2 extends HKT1,
  F3 extends HKT1,
  F4 extends HKT1,
  F5 extends HKT1,
  F6 extends HKT1,
> = Apply1<F6, Apply1<F5, Apply1<F4, Apply1<F3, Apply1<F2, Apply1<F1, T>>>>>>;
export type Pipe7<
  T,
  F1 extends HKT1,
  F2 extends HKT1,
  F3 extends HKT1,
  F4 extends HKT1,
  F5 extends HKT1,
  F6 extends HKT1,
  F7 extends HKT1,
> = Apply1<F7, Apply1<F6, Apply1<F5, Apply1<F4, Apply1<F3, Apply1<F2, Apply1<F1, T>>>>>>>;
export type Pipe8<
  T,
  F1 extends HKT1,
  F2 extends HKT1,
  F3 extends HKT1,
  F4 extends HKT1,
  F5 extends HKT1,
  F6 extends HKT1,
  F7 extends HKT1,
  F8 extends HKT1,
> = Apply1<
  F8,
  Apply1<F7, Apply1<F6, Apply1<F5, Apply1<F4, Apply1<F3, Apply1<F2, Apply1<F1, T>>>>>>>
>;

export type Flow1<F1 extends HKT1> = F1;
export interface Flow2<F1 extends HKT1, F2 extends HKT1> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => Apply1<F2, Apply1<F1, typeof x>>;
}
export interface Flow3<F1 extends HKT1, F2 extends HKT1, F3 extends HKT1> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => Apply1<F3, Apply1<F2, Apply1<F1, typeof x>>>;
}
export interface Flow4<F1 extends HKT1, F2 extends HKT1, F3 extends HKT1, F4 extends HKT1>
  extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => Apply1<F4, Apply1<F3, Apply1<F2, Apply1<F1, typeof x>>>>;
}
export interface Flow5<
  F1 extends HKT1,
  F2 extends HKT1,
  F3 extends HKT1,
  F4 extends HKT1,
  F5 extends HKT1,
> extends HKT1 {
  new: (
    x: Assume<this['_1'], unknown>,
  ) => Apply1<F5, Apply1<F4, Apply1<F3, Apply1<F2, Apply1<F1, typeof x>>>>>;
}
export interface Flow6<
  F1 extends HKT1,
  F2 extends HKT1,
  F3 extends HKT1,
  F4 extends HKT1,
  F5 extends HKT1,
  F6 extends HKT1,
> extends HKT1 {
  new: (
    x: Assume<this['_1'], unknown>,
  ) => Apply1<F6, Apply1<F5, Apply1<F4, Apply1<F3, Apply1<F2, Apply1<F1, typeof x>>>>>>;
}
export interface Flow7<
  F1 extends HKT1,
  F2 extends HKT1,
  F3 extends HKT1,
  F4 extends HKT1,
  F5 extends HKT1,
  F6 extends HKT1,
  F7 extends HKT1,
> extends HKT1 {
  new: (
    x: Assume<this['_1'], unknown>,
  ) => Apply1<F7, Apply1<F6, Apply1<F5, Apply1<F4, Apply1<F3, Apply1<F2, Apply1<F1, typeof x>>>>>>>;
}
export interface Flow8<
  F1 extends HKT1,
  F2 extends HKT1,
  F3 extends HKT1,
  F4 extends HKT1,
  F5 extends HKT1,
  F6 extends HKT1,
  F7 extends HKT1,
  F8 extends HKT1,
> extends HKT1 {
  new: (
    x: Assume<this['_1'], unknown>,
  ) => Apply1<
    F8,
    Apply1<F7, Apply1<F6, Apply1<F5, Apply1<F4, Apply1<F3, Apply1<F2, Apply1<F1, typeof x>>>>>>>
  >;
}

export type Compose1<F1 extends HKT1> = F1;
export interface Compose2<F1 extends HKT1, F2 extends HKT1> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => Apply1<F1, Apply1<F2, typeof x>>;
}
export interface Compose3<F1 extends HKT1, F2 extends HKT1, F3 extends HKT1> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => Apply1<F1, Apply1<F2, Apply1<F3, typeof x>>>;
}
export interface Compose4<F1 extends HKT1, F2 extends HKT1, F3 extends HKT1, F4 extends HKT1>
  extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => Apply1<F1, Apply1<F2, Apply1<F3, Apply1<F4, typeof x>>>>;
}
export interface Compose5<
  F1 extends HKT1,
  F2 extends HKT1,
  F3 extends HKT1,
  F4 extends HKT1,
  F5 extends HKT1,
> extends HKT1 {
  new: (
    x: Assume<this['_1'], unknown>,
  ) => Apply1<F1, Apply1<F2, Apply1<F3, Apply1<F4, Apply1<F5, typeof x>>>>>;
}
export interface Compose6<
  F1 extends HKT1,
  F2 extends HKT1,
  F3 extends HKT1,
  F4 extends HKT1,
  F5 extends HKT1,
  F6 extends HKT1,
> extends HKT1 {
  new: (
    x: Assume<this['_1'], unknown>,
  ) => Apply1<F1, Apply1<F2, Apply1<F3, Apply1<F4, Apply1<F5, Apply1<F6, typeof x>>>>>>;
}
export interface Compose7<
  F1 extends HKT1,
  F2 extends HKT1,
  F3 extends HKT1,
  F4 extends HKT1,
  F5 extends HKT1,
  F6 extends HKT1,
  F7 extends HKT1,
> extends HKT1 {
  new: (
    x: Assume<this['_1'], unknown>,
  ) => Apply1<F1, Apply1<F2, Apply1<F3, Apply1<F4, Apply1<F5, Apply1<F6, Apply1<F7, typeof x>>>>>>>;
}
export interface Compose8<
  F1 extends HKT1,
  F2 extends HKT1,
  F3 extends HKT1,
  F4 extends HKT1,
  F5 extends HKT1,
  F6 extends HKT1,
  F7 extends HKT1,
  F8 extends HKT1,
> extends HKT1 {
  new: (
    x: Assume<this['_1'], unknown>,
  ) => Apply1<
    F1,
    Apply1<F2, Apply1<F3, Apply1<F4, Apply1<F5, Apply1<F6, Apply1<F7, Apply1<F8, typeof x>>>>>>>
  >;
}
