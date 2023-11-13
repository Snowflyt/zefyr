import objWith from '../../ObjectConstructor/with';
import { patch } from '../../internal/utils/patch';

import type { BasePath, BasePathArray, PathFn } from '../../global/path';
import type { PropFn } from '../../global/prop';
import type { List, Obj, Path } from '../../internal/types/tools';

declare global {
  interface ObjectConstructor {
    with: {
      /**
       * Returns a new object with the specified property set to the given value.
       * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
       * @param prop Property name or `prop` function representing the property to set.
       * @param value Value to set.
       *
       * @example
       * ```typescript
       * const obj = { a: 1, b: 2, c: { d: [{ e: 3 }] } };
       * Object.with(obj, 'a', 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
       * Object.with(obj, prop('a'), 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
       * Object.with(obj, path('c.d[0].e'), 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
       * Object.with(obj, ['c', 'd', '0', 'e'], 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
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
       * Object.with(obj, 'a', 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
       * Object.with(obj, prop('a'), 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
       * Object.with(obj, path('c.d[0].e'), 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
       * Object.with(obj, ['c', 'd', '0', 'e'], 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
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
       * Object.with(obj, 'a', 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
       * Object.with(obj, prop('a'), 2); // => { a: 2, b: 2, c: { d: [{ e: 3 }] } }
       * Object.with(obj, path('c.d[0].e'), 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
       * Object.with(obj, ['c', 'd', '0', 'e'], 4); // => { a: 1, b: 2, c: { d: [{ e: 4 }] } }
       * ```
       */
      <O extends object, const PP extends BasePathArray<O>>(
        o: O,
        path: PP,
        value: Obj.Get<O, Path<PP> extends List<PropertyKey> ? Path<PP> : never>,
      ): O;
    };
  }
}

patch(Object).withStatic({ with: objWith });
