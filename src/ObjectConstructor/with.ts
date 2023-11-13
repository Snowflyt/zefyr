import isLength from '../global/isLength';
import { zTag } from '../internal/zTag';

import type { BasePath, BasePathArray, PathFn } from '../global/path';
import type { PropFn } from '../global/prop';
import type { List, Obj, Path } from '../internal/types/tools';

const objWith: {
  /**
   * Returns a new object with the specified property set to the given value.
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   * @param prop Property name or `prop` function representing the property to set.
   * @param value Value to set.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
   * objWith(obj, 'a', 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
   * objWith(obj, prop('a'), 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
   * objWith(obj, path('c.d[0].e'), 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
   * objWith(obj, ['c', 'd', '0', 'e'], 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
   * ```
   */
  <
    O extends object,
    const K extends {
      [P in keyof O]: O[P] extends PropertyKey ? P : never;
    }[keyof O],
  >(
    o: O,
    prop: K | PropFn<O, K>,
    value: O[K],
  ): O;
  /**
   * Returns a new object with the specified property set to the given value.
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   * @param path Property path or `path` function representing the property to set.
   * @param value Value to set.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
   * objWith(obj, 'a', 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
   * objWith(obj, prop('a'), 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
   * objWith(obj, path('c.d[0].e'), 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
   * objWith(obj, ['c', 'd', '0', 'e'], 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
   * ```
   */
  <O extends object, const PP extends BasePath<O> | BasePathArray<O>>(
    o: O,
    path: PathFn<O, PP>,
    value: Obj.Get<O, Path<PP> extends List<PropertyKey> ? Path<PP> : never>,
  ): O;
  /**
   * Returns a new object with the specified property set to the given value.
   * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
   * @param path Property path or `path` function representing the property to set.
   * @param value Value to set.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
   * objWith(obj, 'a', 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
   * objWith(obj, prop('a'), 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
   * objWith(obj, path('c.d[0].e'), 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
   * objWith(obj, ['c', 'd', '0', 'e'], 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
   * ```
   */
  <O extends object, const PP extends BasePathArray<O>>(
    o: O,
    path: PP,
    value: Obj.Get<O, Path<PP> extends List<PropertyKey> ? Path<PP> : never>,
  ): O;
} = <
  O extends object,
  const K extends {
    [P in keyof O]: O[P] extends PropertyKey ? P : never;
  }[keyof O],
  const PP extends BasePath<O> | BasePathArray<O>,
>(
  o: O,
  rawPath: K | PropFn<O, K> | PathFn<O, PP>,
  value: O[K] | Obj.Get<O, Path<PP> extends List<PropertyKey> ? Path<PP> : never>,
) => {
  if (typeof rawPath !== 'function' && !Array.isArray(rawPath))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Type comparison is excessively slow
    return { ...o, [rawPath]: value };
  if (rawPath[zTag as keyof typeof rawPath] === 'Prop')
    return {
      ...o,
      [(rawPath as unknown as { prop: string }).prop]: value,
    } as never;

  // @ts-expect-error - `parsed` is intentionally not defined in TS
  const pathArray: string[] = Array.isArray(rawPath) ? rawPath : rawPath.parsed;

  const result = Array.isArray(o) ? [...o] : { ...o };
  let t = result;
  for (let i = 0; i < pathArray.length; i++) {
    const k = pathArray[i]!;
    if (i === pathArray.length - 1) {
      t[k as keyof typeof t] = value as never;
      continue;
    } else if (!(k in t)) {
      const nextK = pathArray[i + 1];
      t[k as keyof typeof t] = (isLength(Number(nextK)) ? [] : {}) as never;
    } else {
      t[k as keyof typeof t] = (
        Array.isArray(t[k as keyof typeof t])
          ? [...(t[k as keyof typeof t] as unknown[])]
          : { ...t[k as keyof typeof t] }
      ) as never;
    }
    t = t[k as keyof typeof t] as never;
  }

  return result as never;
};

export default objWith;
