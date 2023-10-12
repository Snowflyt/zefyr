import type { False, True } from '../bool';
import type { If } from '../common';
import type { Assume, HKT1, HKT2, HKT3, Pipe1 } from '../hkt';
import type { List } from '../list';
import type { Str } from '../str';

export type Num = number;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Num {
  export type IsPos<N extends Num> = `${N}` extends `-${string}` ? False : True;
  export interface IsPos$ extends HKT1 {
    new: (n: Assume<this['_1'], Num>) => IsPos<typeof n>;
  }

  export type isNeg<N extends Num> = `${N}` extends `-${string}` ? True : False;
  export interface IsNeg$ extends HKT1 {
    new: (n: Assume<this['_1'], Num>) => isNeg<typeof n>;
  }

  export type IsNat<T> = T extends
    | string
    | number
    | bigint
    | boolean
    | null
    | undefined
    ? Pipe1<Str.ToChars<`${T}`>, List.Every$<Str.IsDigit$>>
    : False;
  export interface IsNat$ extends HKT1 {
    new: (x: Assume<this['_1'], Num>) => IsNat<typeof x>;
  }
  export type IfNat<T, Then, Else> = If<IsNat<T>, Then, Else>;
  export interface IfNat$<Then, Else> extends HKT1 {
    new: (x: Assume<this['_1'], unknown>) => IfNat<typeof x, Then, Else>;
  }
  export interface IfNat$$<Else> extends HKT2 {
    new: (
      x: Assume<this['_1'], unknown>,
      then: Assume<this['_2'], unknown>,
    ) => IfNat<typeof x, typeof then, Else>;
  }
  export interface IfNat$$$ extends HKT3 {
    new: (
      x: Assume<this['_1'], unknown>,
      then: Assume<this['_2'], unknown>,
      else_: Assume<this['_3'], unknown>,
    ) => IfNat<typeof x, typeof then, typeof else_>;
  }
}

export type * from './int';
export type * from './nat';
