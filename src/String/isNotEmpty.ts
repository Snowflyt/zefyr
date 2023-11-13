/**
 * Returns `true` if the string is not empty.
 *
 * @example
 * ```typescript
 * isNotEmpty(''); // => false
 * isNotEmpty(' '); // => true
 * ```
 *
 * @see {@link isEmpty}
 */
const isNotEmpty = <const S extends string>(str: string): str is Exclude<S, ''> => str.length > 0;

export default isNotEmpty;
