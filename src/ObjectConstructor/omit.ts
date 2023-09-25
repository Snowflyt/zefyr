import { zTag } from '../internal/zTag';

import type { BasePath, BasePathArray, OmitByPath, Path } from '../global/path';
import type { Prop } from '../global/prop';

declare const omitPropFallback: unique symbol;

/**
 * Returns an object composed of the own and inherited enumerable properties of the object that are not omitted.
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 * @param keys The property names or paths to omit.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: { d: [3, 4, 5] }, e: 6 };
 * omit(obj, 'a', 'b'); // => { c: { d: [3, 4, 5] }, e: 6 }
 * omit(obj, path('c.d')); // => { a: 1, b: 2, c: {}, e: 6 }
 * omit(obj, prop('e'), 'a', path('c.d[1]')); // => { b: 2, c: { d: [3, 5] } }
 * ```
 */
const omit = <
  const O extends object,
  const P extends keyof O | typeof omitPropFallback,
  const PP extends BasePath<O> | BasePathArray<O> = never,
>(
  o: O,
  // @ts-expect-error - P must be keyof O, since emitPropFallback is not exported
  ...keys: readonly (P | Prop<O, P> | Path<O, PP>)[]
): [PP] extends [never]
  ? typeof omitPropFallback extends P
    ? O
    : Omit<O, P>
  : OmitByPath<typeof omitPropFallback extends P ? O : Omit<O, P>, PP> => {
  const result = { ...o };
  for (const key of keys) {
    if (typeof key === 'string') {
      if (key in result) delete result[key];
      continue;
    }
    if (key[zTag as keyof typeof key] === 'Prop') {
      const prop = (key as unknown as { prop: string }).prop;
      if (prop in result) delete result[prop as keyof typeof result];
      continue;
    }
    const path = (key as unknown as { parsed: string[] }).parsed;
    let t: object = result;
    for (let i = 0; i < path.length; i++) {
      const k = path[i] as keyof typeof t;
      if (!(k in t)) break;
      if (i === path.length - 1) {
        if (Array.isArray(t)) {
          const idx = Number(k);
          if (Number.isNaN(idx)) break;
          t.splice(idx, 1);
        } else {
          delete t[k];
        }
        break;
      }
      const oldT = t;
      t = t[k];
      t = Array.isArray(t) ? [...t] : { ...t };
      oldT[k as unknown as keyof typeof oldT] = t as never;
    }
  }
  return result as never;
};

export default omit;
