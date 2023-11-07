import getTag from '../internal/_getTag';

import isObjectLike from './isObjectLike';

/**
 * Returns `true` if the value is a `Map`.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isMap(new Map()); // => true
 * isMap(new WeakMap()); // => false
 * ```
 */
const isMap = (value: unknown): value is Map<unknown, unknown> =>
  isObjectLike(value) && getTag(value) === 'Map';

export default isMap;
