import getTag from '../internal/_getTag';

import isObjectLike from './isObjectLike';

/**
 * Returns `true` if the value is classified as a number primitive or object.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isNumber(0); // => true
 * isNumber(1); // => true
 * isNumber(1.5); // => true
 * isNumber(new Number(1)); // => true
 * isNumber(''); // => false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const isNumber = (value: unknown): value is number | Number =>
  typeof value === 'number' || (isObjectLike(value) && getTag(value) === 'Number');

export default isNumber;
