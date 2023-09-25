import getTag from '../internal/_getTag';

import isObjectLike from './isObjectLike';

/**
 * Returns `true` if the value is classified as a bigint primitive or object.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isBigInt(0n); // => true
 * isBigInt(1n); // => true
 * isBigInt(Object(BigInt(1))); // => true
 * isBigInt(''); // => false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const isBigInt = (value: unknown): value is bigint | BigInt =>
  typeof value === 'bigint' ||
  (isObjectLike(value) && getTag(value) === 'BigInt');

export default isBigInt;
