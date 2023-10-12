import objWithW from '../../ObjectConstructor/withW';
import { patch } from '../../internal/utils/patch';

import type { PathFn } from '../../global/path';
import type { PropFn } from '../../global/prop';
import type { Obj, Path } from '../../internal/types/tools';

declare global {
  interface ObjectConstructor {
    withW: {
      /**
       * Returns a new object with the specified property set to the given value.
       *
       * It is the same as `Object.with`, but with looser type restrictions. The `W` postfix stands for "wide".
       * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
       * @param prop Property name or `prop` function representing the property to set.
       * @param value Value to set.
       *
       * @example
       * ```typescript
       * const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
       * Object.withW(obj, 'a', 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
       * Object.withW(obj, prop('a'), 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
       * Object.withW(obj, path('c.d[0].e'), 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
       * Object.withW(obj, ['c', 'd', '0', 'e'], 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
       * ```
       *
       * @see {@link Object.with}
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
       * It is the same as `Object.with`, but with looser type restrictions. The `W` postfix stands for "wide".
       * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
       * @param path Property path or `path` function representing the property to set.
       * @param value Value to set.
       *
       * @example
       * ```typescript
       * const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
       * Object.withW(obj, 'a', 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
       * Object.withW(obj, prop('a'), 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
       * Object.withW(obj, path('c.d[0].e'), 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
       * Object.withW(obj, ['c', 'd', '0', 'e'], 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
       * ```
       *
       * @see {@link Object.with}
       */
      <
        O extends object,
        const PP extends string | readonly PropertyKey[],
        const V,
      >(
        o: O,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        path: PathFn<any, PP>,
        value: V,
      ): Obj.With<O, Path<PP>, Obj.WritableDeep<V>>;
      /**
       * Returns a new object with the specified property set to the given value.
       *
       * It is the same as `Object.with`, but with looser type restrictions. The `W` postfix stands for "wide".
       * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
       * @param path Property path or `path` function representing the property to set.
       * @param value Value to set.
       *
       * @example
       * ```typescript
       * const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
       * Object.withW(obj, 'a', 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
       * Object.withW(obj, prop('a'), 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
       * Object.withW(obj, path('c.d[0].e'), 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
       * Object.withW(obj, ['c', 'd', '0', 'e'], 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
       * ```
       *
       * @see {@link Object.with}
       */
      <O extends object, const PP extends readonly PropertyKey[], const V>(
        o: O,
        path: PP,
        value: V,
      ): Obj.With<O, Path<PP>, Obj.WritableDeep<V>>;
    };
  }
}

patch(Object).withStatic({ withW: objWithW });
