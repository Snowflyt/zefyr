import type { Int } from './int';
import type { Assume, HKT1 } from '../hkt';

export type Nat = number;

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace Nat {
  type GT<N extends Nat, M extends Nat> = N extends 0
    ? false
    : M extends 0
    ? true
    : GT<Int.Dec<N>, Int.Dec<M>>;
  interface GT$<M extends Nat> extends HKT1 {
    new: (n: Assume<this['_1'], Nat>) => GT<typeof n, M>;
  }

  type GTE<N extends Nat, M extends Nat> = N extends 0
    ? M extends 0
      ? true
      : false
    : M extends 0
    ? true
    : GTE<Int.Dec<N>, Int.Dec<M>>;
  interface GTE$<M extends Nat> extends HKT1 {
    new: (n: Assume<this['_1'], Nat>) => GTE<typeof n, M>;
  }

  type LT<N extends Nat, M extends Nat> = N extends 0
    ? M extends 0
      ? false
      : true
    : M extends 0
    ? false
    : LT<Int.Dec<N>, Int.Dec<M>>;
  interface LT$<M extends Nat> extends HKT1 {
    new: (n: Assume<this['_1'], Nat>) => LT<typeof n, M>;
  }

  type LTE<N extends Nat, M extends Nat> = N extends 0
    ? true
    : M extends 0
    ? false
    : LTE<Int.Dec<N>, Int.Dec<M>>;
  interface LTE$<M extends Nat> extends HKT1 {
    new: (n: Assume<this['_1'], Nat>) => LTE<typeof n, M>;
  }
}
