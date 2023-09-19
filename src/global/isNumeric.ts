import getTag from '../.internal/_getTag';

import isObjectLike from './isObjectLike';

/**
 * Returns `true` if the value is classified as a numeric primitive or object (number primitive, bigint primitive, Number object, or BigInt object)
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isNumeric(0); // => true
 * isNumeric(1); // => true
 * isNumeric(1.5); // => true
 * isNumeric(0n); // => true
 * isNumeric(1n); // => true
 * isNumeric(new Number(1)); // => true
 * isNumeric(Object(BigInt(1))); // => true
 * isNumeric(''); // => false
 * ```
 */
const isNumeric = (
  value: unknown,
): value is
  | number
  | bigint
  // eslint-disable-next-line @typescript-eslint/ban-types
  | Number
  // eslint-disable-next-line @typescript-eslint/ban-types
  | BigInt => {
  if (typeof value === 'number' || typeof value === 'bigint') return true;
  if (isObjectLike(value)) {
    const tag = getTag(value);
    return tag === 'Number' || tag === 'BigInt';
  }
  return false;
};

export default isNumeric;
