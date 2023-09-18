import isNotEmpty from './isNotEmpty';

/**
 * Returns `true` if the string is not empty and contains at least one non-blank character.
 *
 * @example
 * ```typescript
 * isNotBlank(''); // => false
 * isNotBlank(' '); // => false
 * isNotBlank('hello'); // => true
 * isNotBlank('  hello  '); // => true
 * ```
 *
 * @see {@link isBlank}
 */
const isNotBlank = (str: string): boolean => isNotEmpty(str.trim());

export default isNotBlank;
