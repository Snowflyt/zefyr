import getTag from '../internal/_getTag';

import isObjectLike from './isObjectLike';

/**
 * Returns `true` if the value is classified as a symbol primitive or object.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isSymbol(Symbol('foo')); // => true
 * isSymbol(Symbol.iterator); // => true
 * isSymbol(Object(Symbol('foo'))); // => true
 * isSymbol('foo'); // => false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const isSymbol = (value: unknown): value is symbol | Symbol =>
  typeof value === 'symbol' || (isObjectLike(value) && getTag(value) === 'Symbol');

export default isSymbol;
