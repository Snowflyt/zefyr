import omit from '../../ObjectConstructor/omit';
import { patch } from '../../internal/utils/patch';

import type {
  BasePath,
  BasePathArray,
  OmitByPath,
  PathFn,
} from '../../global/path';
import type { PropFn } from '../../global/prop';

declare const omitPropFallback: unique symbol;

declare global {
  interface ObjectConstructor {
    /**
     * Returns an object composed of the own and inherited enumerable properties of the object that are not omitted.
     * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     * @param keys The property names or paths to omit.
     *
     * @example
     * ```typescript
     * const obj = { a: 1, b: 2, c: { d: [3, 4, 5] }, e: 6 };
     * Object.omit(obj, 'a', 'b'); // => { c: { d: [3, 4, 5] }, e: 6 }
     * Object.omit(obj, path('c.d')); // => { a: 1, b: 2, c: {}, e: 6 }
     * Object.omit(obj, prop('e'), 'a', path('c.d[1]')); // => { b: 2, c: { d: [3, 5] } }
     * ```
     */
    omit<
      const O extends object,
      const P extends keyof O | typeof omitPropFallback,
      const PP extends BasePath<O> | BasePathArray<O> = never,
    >(
      o: O,
      // @ts-expect-error - P must be keyof O, since emitPropFallback is not exported
      ...keys: readonly (P | PropFn<O, P> | PathFn<O, PP>)[]
    ): [PP] extends [never]
      ? typeof omitPropFallback extends P
        ? O
        : Omit<O, P>
      : OmitByPath<typeof omitPropFallback extends P ? O : Omit<O, P>, PP>;
  }
}

patch(Object).withStatic({ omit } as never);
