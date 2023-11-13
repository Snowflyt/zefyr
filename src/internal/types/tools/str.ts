import type { False, True } from './bool';
import type { If } from './common';
import type { Assume, HKT1, HKT2, HKT3 } from './hkt';
import type { Int, Num } from './num';

export type Str = string;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Str {
  export type Empty = '';

  type Of<T> = T extends string | number | bigint | boolean | null | undefined ? `${T}` : never;
  export interface Of$ extends HKT1 {
    new: (x: Assume<this['_1'], unknown>) => Of<typeof x>;
  }

  export type Repeat<S extends Str, N extends Num> = N extends 0
    ? Empty
    : N extends 1
    ? S
    : // @ts-expect-error - Type instantiation too deep
      `${S}${Repeat<S, Int.Dec<N>>}`;
  export interface Repeat$<N extends Num> extends HKT1 {
    new: (s: Assume<this['_1'], Str>) => Repeat<typeof s, N>;
  }

  export type ToChars<S extends Str> = S extends `${infer Head}${infer Tail}`
    ? readonly [Head, ...ToChars<Tail>]
    : readonly [];
  export interface ToChars$ extends HKT1 {
    new: (s: Assume<this['_1'], Str>) => ToChars<typeof s>;
  }

  export type IsDigit<S extends Str> = S extends `${infer C}`
    ? C extends '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
      ? True
      : False
    : False;
  export interface IsDigit$ extends HKT1 {
    new: (s: Assume<this['_1'], Str>) => IsDigit<typeof s>;
  }
  export type IfDigit<S extends Str, Then, Else> = If<IsDigit<S>, Then, Else>;
  export interface IfDigit$<Then, Else> extends HKT1 {
    new: (s: Assume<this['_1'], Str>) => IfDigit<typeof s, Then, Else>;
  }
  export interface IfDigit$$<Else> extends HKT2 {
    new: (
      s: Assume<this['_1'], Str>,
      then: Assume<this['_2'], unknown>,
    ) => IfDigit<typeof s, typeof then, Else>;
  }
  export interface IfDigit$$$ extends HKT3 {
    new: (
      s: Assume<this['_1'], Str>,
      then: Assume<this['_2'], unknown>,
      else_: Assume<this['_3'], unknown>,
    ) => IfDigit<typeof s, typeof then, typeof else_>;
  }
}
