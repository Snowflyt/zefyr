import {
  filter,
  isEmpty,
  map,
  mapKeys,
  mapValues,
  omit,
  reduce,
  size,
} from '../ObjectConstructor';

import groupBy from './groupBy';

import type { StrictEntries } from '../ObjectConstructor/entriesS';
import type { StrictKeys } from '../ObjectConstructor/keysS';
import type { Size } from '../ObjectConstructor/size';
import type { StrictValues } from '../ObjectConstructor/valuesS';
import type {
  BasePath,
  BasePathArray,
  GetByPath,
  OmitByPath,
  Path,
} from '../global/path';
import type { Prop } from '../global/prop';
import type { Cast } from '../internal/types/assertion';
import type { ListOf } from '../internal/types/union';

declare const omitPropFallback: unique symbol;

/**
 * An object with additional methods.
 */
export type ExtendedObject<O extends object> = O & {
  /**
   * Returns the object itself, but hide all additional methods in TS.
   *
   * It does **not** actually hide the methods, it just makes them invisible in TS. If you want to hide them also in JS, use `purify` instead.
   * @example
   * ```typescript
   * const obj = { a: 1 };
   * const obj2 = { ...ex(obj).filter(([, v]) => v > 0) }; // obj2 :: { a?: number | undefined, keys: () => ..., values: () => ..., ... }
   * const obj3 = { ...ex(obj).filter(([, v]) => v > 0).mask() }; // obj3 :: { a?: number | undefined }
   * ```
   *
   * @see {@link ExtendedObject#purify}
   */
  mask: () => O;
  /**
   * Returns a new object with all additional methods removed.
   *
   * Compared to `mask`, it actually removes the methods and returns a new one, but it also means this is less performant.
   * @example
   * ```typescript
   * const obj = { a: 1 };
   * const obj2 = { ...ex(obj).filter(([, v]) => v > 0) }; // obj2 :: { a?: number | undefined, keys: () => ..., values: () => ..., ... }
   * const obj3 = { ...ex(obj).filter(([, v]) => v > 0).purify() }; // obj3 :: { a?: number | undefined }
   * ```
   *
   * @see {@link ExtendedObject#mask}
   */
  purify: () => O;

  /**
   * Returns the names of the enumerable string properties and methods of the object (using `Object.keysS`).
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: 3, 5: 42, [Symbol()]: 'symbol' };
   * ex(obj).keys(); // => ['5', 'a', 'b', 'c']
   * const keys = ex(obj).keys(); // keys :: ('5' | 'a' | 'b' | 'c')[]
   * ```
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: 3, 5: 42, [Symbol()]: 'symbol' };
   * for (const key of ex(obj).keys()) {
   *   console.log(obj[key]); // No type error
   * }
   * ```
   *
   * @see {@link Object.keysS}
   */
  keys: () => StrictKeys<O>;
  /**
   * Returns an array of values of the enumerable properties of the object (using `Object.valuesS`).
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: 3, 5: 42, [Symbol()]: 'symbol' };
   * ex(obj).values(); // => [42, 1, 2, 3]
   * const values = ex(obj).values(); // values :: number[]
   * ```
   *
   * @see {@link Object.valuesS}
   */
  values: () => StrictValues<O>;
  /**
   * Returns an array of key/values of the enumerable properties of the object (using `Object.entriesS`).
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: true, 5: 42, [Symbol()]: 'symbol' };
   * ex(obj).entries(); // => [['5', 42], ['a', 1], ['b', 2], ['c', true]]
   * const entries = ex(obj).entries(); // entries :: (['5', number] | ['a', number] | ['b', number] | ['c', boolean])[]
   * ```
   *
   * @see {@link Object.entriesS}
   */
  entries: () => StrictEntries<O>;

  /**
   * Returns the number of enumerable properties and methods of the object or the length of the object if it is an array-like object (using `Object.size`)
   *
   * @example
   * ```typescript
   * ex({ a: 1, b: 2, c: 3 }).size(); // => 3
   * ex({ length: 3 }).size(); // => 3
   * ex(new Map([['a', 1], ['b', 2], ['c', 3]])).size(); // => 3
   * ex(new Set([1, 2, 3, 4])).size(); // => 4
   * ```
   */
  size: () => Size<O>;
  /**
   * Returns `true` if the object is an empty object. An object is considered empty unless it’s an arguments object, array, or
   * jQuery-like collection with a length greater than 0 or an object with own enumerable properties (using `_.isEmpty`).
   *
   * @example
   * ```typescript
   * ex({}).isEmpty(); // => true
   * ex({ a: 1 }).isEmpty(); // => false
   * ex([1, 2, 3]).isEmpty(); // => false
   * ex([]).isEmpty(); // => true
   * ex(new Map()).isEmpty(); // => true
   * ex(new Set()).isEmpty(); // => true
   * ```
   *
   * @see {@link _.isEmpty}
   */
  isEmpty: () => boolean;

  /**
   * Calls a defined callback function on each enumerable key/value pair of the object, and returns an object that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map function calls the callbackfn function one time for each key/value pair in the object.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
   * ex(obj).map(([key, value]) => [`${key}_`, value * 2]); // => { '5_': 84, 'a_': 2, 'b_': 4 }
   * const mapped = ex(obj).map(([key, value]) => [`${key}_`, value * 2]); // mapped :: { '5_': number, 'a_': number, 'b_': number }
   * ```
   */
  map: <R extends readonly [string, unknown]>(
    callbackfn: (
      entry: StrictEntries<O>[number],
      index: number,
      object: O,
    ) => R,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any,
  ) => ExtendedObject<{ [P in R[0]]: R[1] }>;
  /**
   * Calls a defined callback function on each enumerable key of the object, and returns an object that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The mapKeys function calls the callbackfn function one time for each key in the object.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
   * ex(obj).mapKey((key) => `${key}_`); // => { '5_': 42, 'a_': 1, 'b_': 2 }
   * const mapped = ex(obj).mapKeys((key) => `${key}_`); // mapped :: { '5_': number, 'a_': number, 'b_': number }
   * ```
   */
  mapKeys: <R extends string>(
    callbackfn: (key: StrictKeys<O>[number], index: number, object: O) => R,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any,
  ) => ExtendedObject<{ [P in R]: StrictValues<O>[number] }>;
  /**
   * Calls a defined callback function on each enumerable value of the object, and returns an object that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The mapValues function calls the callbackfn function one time for each value in the object.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
   * ex(obj).mapValues((value) => value * 2); // => { '5': 84, 'a': 2, 'b': 4 }
   * const mapped = ex(obj).mapValues((value) => value * 2); // mapped :: { '5': number, 'a': number, 'b': number }
   * ```
   */
  mapValues: <R>(
    callbackfn: (value: StrictValues<O>[number], index: number, object: O) => R,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any,
  ) => ExtendedObject<{ [P in StrictKeys<O>[number]]: R }>;
  /**
   * Calls a defined callback function on each enumerable key/value pair of the object, and returns an object that contains results meeting the condition specified in the callback function.
   * @param predicate A function that accepts up to three arguments. The filter function calls the predicate function one time for each key/value pair in the object.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, 5: 42, [Symbol()]: 'symbol' };
   * ex(obj).filter(([key, value]) => key === 'a' || value === 42); // => { 5: 42, a: 1 }
   * const filtered = ex(obj).filter(([key, value]) => key === 'a' || value === 42); // filtered :: { 5?: number | undefined, a?: number | undefined, b?: number | undefined }
   * ```
   */
  filter: (
    predicate: (
      entry: StrictEntries<O>[number],
      index: number,
      object: O,
    ) => boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any,
  ) => ExtendedObject<{
    // @ts-expect-error - `P` should be keyof `O` but TS cannot infer it
    [P in StrictKeys<O>[number]]?: O[P];
  }>;
  /**
   * Calls a defined callback function on each enumerable key/value pair of the object. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce function calls the callbackfn function one time for each key/value pair in the object.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an object value.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: 3 };
   * ex(obj).reduce((acc, [key, value]) => acc + value, 0); // => 6
   * ```
   */
  reduce: {
    (
      callbackfn: (
        previousValue: StrictValues<O>[number],
        currentEntry: StrictEntries<O>[number],
        currentIndex: number,
        object: O,
      ) => StrictValues<O>[number],
    ): StrictValues<O>[number];
    <R>(
      callbackfn: (
        previousValue: R,
        currentEntry: StrictEntries<O>[number],
        currentIndex: number,
        object: O,
      ) => R,
      initialValue: R,
    ): R;
  };

  /**
   * Returns an object composed of the own and inherited enumerable properties of the object that are not omitted.
   * @param keys The property names or paths to omit.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: { d: [3, 4, 5] }, e: 6 };
   * ex(obj).omit('a', 'b'); // => { c: { d: [3, 4, 5] }, e: 6 }
   * ex(obj).omit(path('c.d')); // => { a: 1, b: 2, c: {}, e: 6 }
   * ex(obj).omit(prop('e'), 'a', path('c.d[1]')); // => { b: 2, c: { d: [3, 5] } }
   * ```
   */
  omit: <
    const P extends keyof O | typeof omitPropFallback,
    const PP extends BasePath<O> | BasePathArray<O> = never,
  >(
    // @ts-expect-error - P must be keyof O, since emitPropFallback is not exported
    ...keys: readonly (P | Prop<O, P> | Path<O, PP>)[]
  ) => // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - TODO: Fix this
  ExtendedObject<
    [PP] extends [never]
      ? typeof omitPropFallback extends P
        ? O
        : Omit<O, P>
      : OmitByPath<typeof omitPropFallback extends P ? O : Omit<O, P>, PP>
  >;
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
   * ex(obj).groupBy(([, value]) => value % 2 === 0 ? 'even' : 'odd'); // => { odd: [1], even: [42, 2] }
   * ex(obj2).groupBy('value'); // => { 1: [{ value: 1, nested: { v: 1 } }], 2: [{ value: 2, nested: { v: 2 } }, { value: 2, nested: { v: 3 } }] }
   * ex(obj2).groupBy(prop('value')); // => { 1: [{ value: 1, nested: { v: 1 } }], 2: [{ value: 2, nested: { v: 2 } }, { value: 2, nested: { v: 3 } }] }
   * ex(obj2).groupBy(path('nested.v')); // => { 1: [{ value: 1, nested: { v: 1 } }], 2: [{ value: 2, nested: { v: 2 } }], 3: [{ value: 2, nested: { v: 3 } }] }
   * ```
   */
  groupBy: {
    <
      const K extends {
        [P in keyof O[keyof O]]: O[keyof O][P] extends PropertyKey ? P : never;
      }[keyof O[keyof O]],
      const PP extends BasePath<O[keyof O]> | BasePathArray<O[keyof O]> = never,
    >(
      fn: K | Prop<O[keyof O], K> | Path<O[keyof O], PP>,
    ): ExtendedObject<
      ListOf<K>['length'] extends 1
        ? { [P in Cast<O[keyof O][K], PropertyKey>]: O[keyof O] }
        : GetByPath<O[keyof O], PP> extends PropertyKey
        ? { [P in Cast<GetByPath<O[keyof O], PP>, PropertyKey>]: O[keyof O] }
        : never
    >;
    <const R extends PropertyKey = PropertyKey>(
      fn: (entry: StrictEntries<O>[number], index: number, object: O) => R,
    ): ExtendedObject<{
      [P in R]: O[keyof O];
    }>;
  };
};

const mixin = <const O extends object, const M extends object>(
  o: O,
  mixins: M,
): O & M => {
  const result = Array.isArray(o) ? [...o] : { ...o };
  for (const [n, value] of Object.entries(mixins)) {
    if (n in o) {
      console.warn(
        `Property "${String(n)}" already exists on \`${String(o)}\``,
      );
      continue;
    }
    Object.defineProperty(result, n, {
      value,
      configurable: true,
      enumerable: false,
      writable: true,
    });
  }
  return result as O & M;
};

/**
 * Creates an object with additional methods.
 * @param o The object to extend.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 };
 * ex(obj).filter(([k, v]) => v % 2 === 0).mapKeys((k) => k.toUpperCase()); // => { B: 2 }
 * ex(obj).omit('a', 'b').size(); // => 1
 * ```
 */
export const ex = <const O extends object>(o: O): ExtendedObject<O> =>
  mixin(o, {
    mask: () => o,
    purify: () => ({ ...o }),

    keys: () => Object.keys(o) as StrictKeys<O>,
    values: () => Object.values(o) as StrictValues<O>,
    entries: () => Object.entries(o) as StrictEntries<O>,

    size: () => size(o),
    isEmpty: () => isEmpty(o),

    map: <R extends readonly [string, unknown]>(
      callbackfn: (
        entry: StrictEntries<O>[number],
        index: number,
        object: O,
      ) => R,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      thisArg?: any,
    ) => ex(map(o, callbackfn, thisArg)),
    mapKeys: <R extends string>(
      callbackfn: (key: StrictKeys<O>[number], index: number, object: O) => R,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      thisArg?: any,
    ) => ex(mapKeys(o, callbackfn, thisArg)),
    mapValues: <R>(
      callbackfn: (
        value: StrictValues<O>[number],
        index: number,
        object: O,
      ) => R,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      thisArg?: any,
    ) => ex(mapValues(o, callbackfn, thisArg)),
    filter: (
      predicate: (
        entry: StrictEntries<O>[number],
        index: number,
        object: O,
      ) => boolean,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      thisArg?: any,
    ) => ex(filter(o, predicate, thisArg)),
    reduce: <R>(
      ...args:
        | [
            callbackfn: (
              previousValue: StrictValues<O>[number],
              currentEntry: StrictEntries<O>[number],
              currentIndex: number,
              object: O,
            ) => StrictValues<O>[number],
          ]
        | [
            callbackfn: (
              previousValue: R,
              currentEntry: StrictEntries<O>[number],
              currentIndex: number,
              object: O,
            ) => R,
            initialValue: R,
          ]
    ) =>
      // @ts-expect-error - TS doesn't know that `args` is valid
      reduce(o, ...args),

    omit: <
      const P extends keyof O | typeof omitPropFallback,
      const PP extends BasePath<O> | BasePathArray<O> = never,
    >(
      // @ts-expect-error - P must be keyof O, since emitPropFallback is not exported
      ...keys: readonly (P | Prop<O, P> | Path<O, PP>)[]
    ) =>
      // @ts-expect-error - TS doesn't know that `keys` is valid
      ex(omit(o, ...keys)) as never,
    groupBy: (fn: unknown) => ex(groupBy(o, fn as never)) as never,
  });

export { default as groupBy } from './groupBy';
