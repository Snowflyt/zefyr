import getTag from '../internal/_getTag';

import isObjectLike from './isObjectLike';

/**
 * Returns `true` if the value is a classified as a string primitive or object.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isString(''); // => true
 * isString('a'); // => true
 * isString(new String('')); // => true
 * isString(0); // => false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const isString = (value: unknown): value is string | String =>
  typeof value === 'string' ||
  (!Array.isArray(value) && isObjectLike(value) && getTag(value) === 'String');

export default isString;
