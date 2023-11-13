import { zTag } from '../internal/zTag';

import type { StrictEntries } from '../ObjectConstructor/entriesS';
import type { BasePath, BasePathArray, GetByPath, PathFn } from '../global/path';
import type { PropFn } from '../global/prop';
import type { Cast } from '../internal/types/assertion';
import type { ListOf } from '../internal/types/union';

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
 * groupBy(obj, ([, value]) => value % 2 === 0 ? 'even' : 'odd'); // => { odd: [1], even: [42, 2] }
 * groupBy(obj2, 'value'); // => { 1: [{ value: 1, nested: { v: 1 } }], 2: [{ value: 2, nested: { v: 2 } }, { value: 2, nested: { v: 3 } }] }
 * groupBy(obj2, prop('value')); // => { 1: [{ value: 1, nested: { v: 1 } }], 2: [{ value: 2, nested: { v: 2 } }, { value: 2, nested: { v: 3 } }] }
 * groupBy(obj2, path('nested.v')); // => { 1: [{ value: 1, nested: { v: 1 } }], 2: [{ value: 2, nested: { v: 2 } }], 3: [{ value: 2, nested: { v: 3 } }] }
 * ```
 */
const groupBy: {
  <
    const O extends object,
    const K extends {
      [P in keyof O[keyof O]]: O[keyof O][P] extends PropertyKey ? P : never;
    }[keyof O[keyof O]],
    const PP extends BasePath<O[keyof O]> | BasePathArray<O[keyof O]> = never,
  >(
    o: O,
    fn: K | PropFn<O[keyof O], K> | PathFn<O[keyof O], PP>,
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
} = <
  const O extends object,
  const K extends {
    [P in keyof O[keyof O]]: O[keyof O][P] extends PropertyKey ? P : never;
  }[keyof O[keyof O]],
  const PP extends BasePath<O[keyof O]> | BasePathArray<O[keyof O]> = never,
  const R extends PropertyKey = PropertyKey,
>(
  o: O,
  fn:
    | K
    | PropFn<O[keyof O], K>
    | PathFn<O[keyof O], PP>
    | ((entry: StrictEntries<O>[number], index: number, object: O) => R),
) => {
  let processedFn: (entry: StrictEntries<O>[number], index: number, object: O) => R;
  if (fn[zTag as keyof typeof fn] === 'Prop') {
    const prop = (fn as unknown as { prop: string }).prop;
    processedFn = ([, value]) => value[prop as keyof typeof value] as R;
  } else if (fn[zTag as keyof typeof fn] === 'Path') {
    const path = (fn as unknown as { parsed: string[] }).parsed;
    processedFn = ([, value]) => {
      let t = value as object;
      for (let i = 0; i < path.length; i++) {
        const k = path[i] as keyof typeof t;
        if (!(k in t)) break;
        if (i === path.length - 1) {
          if (Array.isArray(t)) {
            const idx = Number(k);
            if (Number.isNaN(idx)) break;
            return t[idx] as R;
          } else {
            return t[k] as R;
          }
        }
        const oldT = t;
        t = t[k];
        t = Array.isArray(t) ? [...t] : { ...t };
        oldT[k as unknown as keyof typeof oldT] = t as never;
      }
      return t as unknown as R;
    };
  } else {
    processedFn = fn as never;
  }

  if (Array.isArray(o)) {
    const result: Record<PropertyKey, unknown[]> = {};
    let index = 0;
    for (const value of o) {
      const key =
        typeof fn === 'function'
          ? processedFn([String(index), value] as never, index, o)
          : // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            value[fn as never];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (key in result) result[key]!.push(value);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      else result[key] = [value];
      index++;
    }
    return result as never;
  }

  const result: Record<PropertyKey, unknown[]> = {};
  let index = -1;
  for (const key in o) {
    const value = o[key];
    const k =
      typeof fn === 'function'
        ? processedFn([key, value] as never, ++index, o)
        : value[fn as never];
    if (k in result) result[k].push(value);
    else result[k] = [value];
  }
  return result as never;
};

export default groupBy;
