import getTag from '../internal/_getTag';

import isObjectLike from './isObjectLike';

/**
 * Returns `true` if the value is a `Set`.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isSet(new Set()); // => true
 * isSet(new WeakSet()); // => false
 * ```
 */
const isSet = (value: unknown): value is Set<unknown> =>
  isObjectLike(value) && getTag(value) === 'Set';

export default isSet;
