export type ToBe<T> = (<G>() => G extends T ? 1 : 2) & { _tag: 'ToBe' };
export type ToExtend<T> = (x: T) => void & { _tag: 'ToExtends' };
export type ToCover<T> = () => T & { _tag: 'ToCover' };

export type Expect<
  T,
  U extends
    | ((<G>() => G extends T ? 1 : 2) & { _tag: 'ToBe' })
    | ((x: T) => void & { _tag: 'ToExtends' })
    | (() => T & { _tag: 'ToCover' }),
> = U;
