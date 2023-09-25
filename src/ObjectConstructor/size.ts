import isArrayLike from '../global/isArrayLike';
import isPrototype from '../internal/_isPrototype';

import type { ListOf } from '../internal/types/union';

export type Size<O extends object> = O extends { length: number }
  ? O['length']
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
  O extends Map<any, any>
  ? O['size']
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
  O extends Set<any>
  ? O['size']
  : string extends keyof O
  ? number
  : number extends keyof O
  ? number
  : symbol extends keyof O
  ? number
  : keyof O extends never
  ? 0
  : ListOf<keyof O>['length'];

/**
 * Returns the number of enumerable properties and methods of an object or the length of an array-like object.
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 *
 * @example
 * ```typescript
 * size({ a: 1, b: 2, c: 3 }); // => 3
 * size({ length: 3 }); // => 3
 * size(new Map([['a', 1], ['b', 2], ['c', 3]])); // => 3
 * size(new Set([1, 2, 3, 4])); // => 4
 * ```
 */
const size = <const O extends object>(o: O): Size<O> => {
  // For array-like objects, return the "length" property
  if (isArrayLike(o)) return o.length as Size<O>;

  // For maps and sets, return the "size" property
  const tag = Object.prototype.toString.call(o);
  if (tag === '[object Map]' || tag === '[object Set]')
    return (o as Map<unknown, unknown> | Set<unknown>).size as Size<O>;

  // For prototypes, return the number of properties
  if (isPrototype(o)) {
    let result = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ in o) result++;
    return result as Size<O>;
  }

  // For all other objects, return the number of own properties
  let result = 0;
  for (const key in Object(o))
    if (Object.hasOwnProperty.call(o, key) && key !== 'constructor') result++;
  return result as Size<O>;
};

export default size;
