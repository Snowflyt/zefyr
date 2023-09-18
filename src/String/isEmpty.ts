/**
 * Returns `true` if the string is empty.
 *
 * @example
 * ```typescript
 * isEmpty(''); // => true
 * isEmpty(' '); // => false
 * ```
 *
 * @example
 * ```typescript
 * const foo = 'hello';
 * if (isEmpty(foo)) {
 *   const bar = foo; // bar :: ''
 * }
 * ```
 */
const isEmpty = (str: string): str is '' => str.length === 0;

export default isEmpty;
