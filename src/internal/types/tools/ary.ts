import type { If, Not } from './common';
import type { Assume, HKT1, HKT2, HKT3 } from './hkt';

export type Ary = readonly unknown[];

export type IsAry<T> = T extends readonly unknown[] ? true : false;
export interface IsAry$ extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IsAry<typeof x>;
}
export type IfAry<T, Then, Else> = If<IsAry<T>, Then, Else>;
export interface IfAry$<Then, Else> extends HKT1 {
  new: (x: Assume<this['_1'], unknown>) => IfAry<typeof x, Then, Else>;
}
export interface IfAry$$<Else> extends HKT2 {
  new: (
    x: Assume<this['_1'], unknown>,
    then: Assume<this['_2'], unknown>,
  ) => IfAry<typeof x, typeof then, Else>;
}
export interface IfAry$$$ extends HKT3 {
  new: (
    x: Assume<this['_1'], unknown>,
    then: Assume<this['_2'], unknown>,
    else_: Assume<this['_3'], unknown>,
  ) => IfAry<typeof x, typeof then, typeof else_>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace Ary {
  type OfWritable<T> = T[];
  interface OfWritable$ extends HKT1 {
    new: (x: Assume<this['_1'], unknown>) => OfWritable<typeof x>;
  }
  type OfReadonly<T> = readonly T[];
  interface OfReadonly$ extends HKT1 {
    new: (x: Assume<this['_1'], unknown>) => OfReadonly<typeof x>;
  }

  type IsWritable<AS extends Ary> = AS extends unknown[] ? true : false;
  interface isWritable$ extends HKT1 {
    new: (as: Assume<this['_1'], Ary>) => IsWritable<typeof as>;
  }
  type IfWritable<AS extends Ary, Then, Else> = If<IsWritable<AS>, Then, Else>;
  interface IfMutable$<Then, Else> extends HKT1 {
    new: (as: Assume<this['_1'], Ary>) => IfWritable<typeof as, Then, Else>;
  }
  interface IfMutable$$<Else> extends HKT2 {
    new: (
      as: Assume<this['_1'], Ary>,
      then: Assume<this['_2'], unknown>,
    ) => IfWritable<typeof as, typeof then, Else>;
  }
  interface IfMutable$$$ extends HKT3 {
    new: (
      as: Assume<this['_1'], Ary>,
      then: Assume<this['_2'], unknown>,
      else_: Assume<this['_3'], unknown>,
    ) => IfWritable<typeof as, typeof then, typeof else_>;
  }
  type IsReadonly<AS extends Ary> = Not<IsWritable<AS>>;
  interface IsReadonly$ extends HKT1 {
    new: (as: Assume<this['_1'], Ary>) => IsReadonly<typeof as>;
  }
  type IfReadonly<AS extends Ary, Then, Else> = If<IsReadonly<AS>, Then, Else>;
  interface IfReadonly$<Then, Else> extends HKT1 {
    new: (as: Assume<this['_1'], Ary>) => IfReadonly<typeof as, Then, Else>;
  }
  interface IfReadonly$$<Else> extends HKT2 {
    new: (
      as: Assume<this['_1'], Ary>,
      then: Assume<this['_2'], unknown>,
    ) => IfReadonly<typeof as, typeof then, Else>;
  }
  interface IfReadonly$$$ extends HKT3 {
    new: (
      as: Assume<this['_1'], Ary>,
      then: Assume<this['_2'], unknown>,
      else_: Assume<this['_3'], unknown>,
    ) => IfReadonly<typeof as, typeof then, typeof else_>;
  }

  type Elem<AS extends Ary> = AS[number];
  interface Elem$ extends HKT1 {
    new: (as: Assume<this['_1'], Ary>) => (typeof as)[number];
  }

  type ElemOrUndefined<AS extends Ary> = Elem<AS> | undefined;
  interface ElemOrUndefined$ extends HKT1 {
    new: (as: Assume<this['_1'], Ary>) => ElemOrUndefined<typeof as>;
  }

  type Mutate<AS extends Ary, T> = IfWritable<AS, T[], readonly T[]>;
  interface Mutate$<T> extends HKT1 {
    new: (as: Assume<this['_1'], Ary>) => Mutate<typeof as, T>;
  }
  interface Mutate$$ extends HKT2 {
    new: (
      as: Assume<this['_1'], Ary>,
      x: Assume<this['_2'], unknown>,
    ) => Mutate<typeof as, typeof x>;
  }

  type Mix<AS extends Ary, T> = IfWritable<
    AS,
    Array<AS[number] | T>,
    ReadonlyArray<AS[number] | T>
  >;
  interface Mix$<T> extends HKT1 {
    new: (as: Assume<this['_1'], Ary>) => Mix<typeof as, T>;
  }
  interface Mix$$ extends HKT2 {
    new: (
      as: Assume<this['_1'], Ary>,
      x: Assume<this['_2'], unknown>,
    ) => Mix<typeof as, typeof x>;
  }
}
