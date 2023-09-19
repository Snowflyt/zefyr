import getTag from '../.internal/_getTag';

import isObjectLike from './isObjectLike';

/**
 * Returns `true` if the value is classified as a boolean primitive or object.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isBoolean(true); // => true
 * isBoolean(false); // => true
 * isBoolean(new Boolean(true)); // => true
 * isBoolean(''); // => false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const isBoolean = (value: unknown): value is boolean | Boolean =>
  value === true ||
  value === false ||
  (isObjectLike(value) && getTag(value) === 'Boolean');

export default isBoolean;
