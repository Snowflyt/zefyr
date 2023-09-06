import isEmpty from './isEmpty';

/**
 * Returns true if the string is empty or contains only blank characters.
 *
 * @example
 * ```typescript
 * isBlank(''); // => true
 * isBlank(' '); // => true
 * isBlank('hello'); // => false
 * isBlank('  hello  '); // => false
 * ```
 */
const isBlank = (str: string): boolean => isEmpty(str.trim());

export default isBlank;
