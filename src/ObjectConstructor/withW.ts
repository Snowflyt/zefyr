import objWith from './with';

import type { BasePath, BasePathArray, GetByPath, PathFn } from '../global/path';
import type { PropFn } from '../global/prop';
import type { Obj, Path } from '../internal/types/tools';

const objWithW: {
  /**
   * Returns a new object with the specified property set to the given value.
   *
   * It is the same as `objWith`, but with looser type restrictions. The `W` postfix stands for "wide".
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   * @param prop Property name or `prop` function representing the property to set.
   * @param value Value to set.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
   * objWithW(obj, 'a', 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
   * objWithW(obj, prop('a'), 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
   * objWithW(obj, path('c.d[0].e'), 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
   * objWithW(obj, ['c', 'd', '0', 'e'], 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
   * ```
   *
   * @see {@link objWith}
   */
  <O extends object, const K extends PropertyKey, const V>(
    o: O,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prop: K | PropFn<any, K>,
    value: V,
  ): Obj.With<O, K, Obj.WritableDeep<V>>;
  /**
   * Returns a new object with the specified property set to the given value.
   *
   * It is the same as `objWith`, but with looser type restrictions. The `W` postfix stands for "wide".
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   * @param path Property path or `path` function representing the property to set.
   * @param value Value to set.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
   * objWithW(obj, 'a', 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
   * objWithW(obj, prop('a'), 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
   * objWithW(obj, path('c.d[0].e'), 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
   * objWithW(obj, ['c', 'd', '0', 'e'], 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
   * ```
   *
   * @see {@link objWith}
   */
  <O extends object, const PP extends string | readonly PropertyKey[], const V>(
    o: O,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    path: PathFn<any, PP>,
    value: V,
  ): Obj.With<O, Path<PP>, Obj.WritableDeep<V>>;
  /**
   * Returns a new object with the specified property set to the given value.
   *
   * It is the same as `objWith`, but with looser type restrictions. The `W` postfix stands for "wide".
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   * @param path Property path or `path` function representing the property to set.
   * @param value Value to set.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
   * objWithW(obj, 'a', 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
   * objWithW(obj, prop('a'), 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
   * objWithW(obj, path('c.d[0].e'), 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
   * objWithW(obj, ['c', 'd', '0', 'e'], 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
   * ```
   *
   * @see {@link objWith}
   */
  <O extends object, const PP extends readonly PropertyKey[], const V>(
    o: O,
    path: PP,
    value: V,
  ): Obj.With<O, Path<PP>, Obj.WritableDeep<V>>;
} = <
  O extends object,
  const K extends {
    [P in keyof O]: O[P] extends PropertyKey ? P : never;
  }[keyof O],
  const PP extends BasePath<O> | BasePathArray<O>,
>(
  ...args: [o: O, rawPath: K | PropFn<O, K> | PathFn<O, PP>, value: O[K] | GetByPath<O, PP>]
) => objWith(...(args as [never, never, never]));

export default objWithW;
