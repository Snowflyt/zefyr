import isArrayLike from '../global/isArrayLike';
import getTag from '../internal/_getTag';
import isPrototype from '../internal/_isPrototype';

/**
 * Returns `true` if the value is an empty object. An object is considered empty unless it’s an arguments object, array, or
 * jQuery-like collection with a length greater than 0 or an object with own enumerable properties.
 * @param o — The value to check.
 *
 * @example
 * ```typescript
 * isEmpty({}); // => true
 * isEmpty({ a: 1 }); // => false
 * isEmpty([1, 2, 3]); // => false
 * isEmpty([]); // => true
 * isEmpty(new Map()); // => true
 * isEmpty(new Set()); // => true
 * ```
 */
const isEmpty: {
  (o: Map<unknown, unknown> | Set<unknown> | ArrayLike<unknown>): boolean;
  (o: object): boolean;
} = (o: object) => {
  // For array-like objects, check the "length" property
  if (isArrayLike(o)) return o.length === 0;

  // For maps and sets, check the "size" property
  const tag = getTag(o);
  if (tag === 'Map' || tag === 'Set')
    return (o as Map<unknown, unknown> | Set<unknown>).size === 0;

  // For prototypes, check the number of properties
  if (isPrototype(o)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ in o) return false;
    return true;
  }

  // For all other objects, check the number of own properties
  for (const key in o) if (Object.hasOwnProperty.call(o, key)) return false;
  return true;
};

export default isEmpty;
