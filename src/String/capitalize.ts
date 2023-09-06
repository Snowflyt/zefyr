/**
 * Converts the first character of a string to uppercase.
 *
 * @example
 * ```typescript
 * capitalize('hello'); // => 'Hello'
 * ```
 */
const capitalize = <S extends string>(str: S): Capitalize<S> =>
  (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<S>;

export default capitalize;
