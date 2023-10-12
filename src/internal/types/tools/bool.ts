import type { Assume, HKT1 } from './hkt';

export type Bool = boolean;
export type True = true;
export type False = false;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Bool {
  export type Not<B extends Bool> = B extends True ? False : True;
  export interface Not$ extends HKT1 {
    new: (b: Assume<this['_1'], Bool>) => Not<typeof b>;
  }
}
