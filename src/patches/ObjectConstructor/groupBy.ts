import groupBy from '../../ObjectConstructor/groupBy';
import { patch } from '../../internal/utils/patch';

import type { StrictEntries } from '../../ObjectConstructor/entriesS';
import type {
  BasePath,
  BasePathArray,
  GetByPath,
  Path,
} from '../../global/path';
import type { Prop } from '../../global/prop';
import type { Cast } from '../../internal/types/assertion';
import type { ListOf } from '../../internal/types/union';

declare global {
  interface ObjectConstructor {
    /**
     * Returns an object composed of keys generated from the results of running each element of the object through `fn`.
     * The corresponding value of each key is an array of the elements responsible for generating the key.
     *
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     * @param fn Prop, Path, a property name or a function that accepts up to three arguments. The groupBy function calls the fn function one time for each key/value pair in the object.
     *
     * @example
     * ```typescript
     * const obj = { a: 1, b: 2, 5: 42 };
     * const obj2 = { a: { value: 1, nested: { v: 1 } }, b: { value: 2, nested: { v: 2 } }, c: { value: 2, nested: { v: 3 } } };
     * Object.groupBy(obj, ([, value]) => value % 2 === 0 ? 'even' : 'odd'); // => { odd: [1], even: [42, 2] }
     * Object.groupBy(obj2, 'value'); // => { 1: [{ value: 1, nested: { v: 1 } }], 2: [{ value: 2, nested: { v: 2 } }, { value: 2, nested: { v: 3 } }] }
     * Object.groupBy(obj2, prop('value')); // => { 1: [{ value: 1, nested: { v: 1 } }], 2: [{ value: 2, nested: { v: 2 } }, { value: 2, nested: { v: 3 } }] }
     * Object.groupBy(obj2, path('nested.v')); // => { 1: [{ value: 1, nested: { v: 1 } }], 2: [{ value: 2, nested: { v: 2 } }], 3: [{ value: 2, nested: { v: 3 } }] }
     * ```
     */
    groupBy: {
      <
        const O extends object,
        const K extends {
          [P in keyof O[keyof O]]: O[keyof O][P] extends PropertyKey
            ? P
            : never;
        }[keyof O[keyof O]],
        const PP extends
          | BasePath<O[keyof O]>
          | BasePathArray<O[keyof O]> = never,
      >(
        o: O,
        fn: K | Prop<O[keyof O], K> | Path<O[keyof O], PP>,
      ): ListOf<K>['length'] extends 1
        ? { [P in Cast<O[keyof O][K], PropertyKey>]: O[keyof O] }
        : GetByPath<O[keyof O], PP> extends PropertyKey
        ? { [P in Cast<GetByPath<O[keyof O], PP>, PropertyKey>]: O[keyof O] }
        : never;
      <const O extends object, const R extends PropertyKey = PropertyKey>(
        o: O,
        fn: (entry: StrictEntries<O>[number], index: number, object: O) => R,
      ): {
        [P in R]: O[keyof O];
      };
    };
  }
}

patch(Object).withStatic({ groupBy } as never);
