/**
 * Returns true if value is null, undefined, or an empty
 *
 * @example
 * ```typescript
 * isEmpty(null); // => true
 * isEmpty(undefined); // => true
 * isEmpty(''); // => true
 * isEmpty(' '); // => false
 * isEmpty('a'); // => false
 * isEmpty(0); // => false
 * ```
 *
 * @example
 * ```typescript
 * const foo: string | null | '' = null;
 * if (isEmpty(foo)) {
 *   const bar = foo; // bar :: null | ''
 * }
 * ```
 */
const isEmpty = (value: unknown): value is null | undefined | '' =>
  value === null || value === undefined || value === '';

export default isEmpty;
