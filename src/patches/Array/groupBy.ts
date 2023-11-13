import groupBy from '../../Array/groupBy';
import { patch } from '../../internal/utils/patch';

import type { Cast } from '../../internal/types/assertion';

declare global {
  interface Array<T> {
    /**
     * Returns an object composed of keys generated from the results of running each element of the array through `fn`.
     * The corresponding value of each key is an array of the elements responsible for generating the key.
     *
     * @param fn Prop, Path, a property name or a function that accepts up to three arguments. The groupBy function calls the fn function one time for each element of the array.
     *
     * @example
     * ```typescript
     * const arr1 = [1, 2, 42];
     * const arr2 = [{ v: 1, n: { v: 1 } }, { v: 2, n: { v: 2 } }, { v: 2, n: { v: 3 } }];
     * arr1.groupBy(value) => value % 2 === 0 ? 'even' : 'odd'); // => { odd: [1], even: [2, 42] }
     * arr2.groupBy('v'); // => { 1: [{ v: 1, n: { v: 1 } }], 2: [{ v: 2, n: { v: 2 } }, { v: 2, n: { v: 3 } }] }
     * arr2.groupBy(prop('v')); // => { 1: [{ v: 1, n: { v: 1 } }], 2: [{ v: 2, n: { v: 2 } }, { v: 2, n: { v: 3 } }] }
     * arr2.groupBy(path('n.v')); // => { 1: [{ v: 1, n: { v: 1 } }], 2: [{ v: 2, n: { v: 2 } }], 3: [{ v: 2, n: { v: 3 } }] }
     * ```
     */
    groupBy: {
      <const R extends PropertyKey = PropertyKey>(fn: (value: T, index: number, array: T[]) => R): {
        [P in R]: T[];
      };
      <
        const K extends {
          [P in keyof T]: T[P] extends PropertyKey ? P : never;
        }[keyof T],
      >(
        propertyName: K,
      ): { [P in Cast<T[K], PropertyKey>]: T[] };
    };
  }

  interface ReadonlyArray<T> {
    /**
     * Returns an object composed of keys generated from the results of running each element of the array through `fn`.
     * The corresponding value of each key is an array of the elements responsible for generating the key.
     *
     * @param fn Prop, Path, a property name or a function that accepts up to three arguments. The groupBy function calls the fn function one time for each element of the array.
     *
     * @example
     * ```typescript
     * const arr1 = [1, 2, 42];
     * const arr2 = [{ v: 1, n: { v: 1 } }, { v: 2, n: { v: 2 } }, { v: 2, n: { v: 3 } }];
     * arr1.groupBy(value) => value % 2 === 0 ? 'even' : 'odd'); // => { odd: [1], even: [2, 42] }
     * arr2.groupBy('v'); // => { 1: [{ v: 1, n: { v: 1 } }], 2: [{ v: 2, n: { v: 2 } }, { v: 2, n: { v: 3 } }] }
     * arr2.groupBy(prop('v')); // => { 1: [{ v: 1, n: { v: 1 } }], 2: [{ v: 2, n: { v: 2 } }, { v: 2, n: { v: 3 } }] }
     * arr2.groupBy(path('n.v')); // => { 1: [{ v: 1, n: { v: 1 } }], 2: [{ v: 2, n: { v: 2 } }], 3: [{ v: 2, n: { v: 3 } }] }
     * ```
     */
    groupBy: {
      <const R extends PropertyKey = PropertyKey>(fn: (value: T, index: number, array: T[]) => R): {
        [P in R]: T[];
      };
      <
        const K extends {
          [P in keyof T]: T[P] extends PropertyKey ? P : never;
        }[keyof T],
      >(
        propertyName: K,
      ): { [P in Cast<T[K], PropertyKey>]: T[] };
    };
  }
}

patch(Array).with({ groupBy });
