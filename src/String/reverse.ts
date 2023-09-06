/**
 * Returns the reversed string.
 *
 * @example
 * ```typescript
 * reverse('hello'); // => 'olleh'
 * ```
 */
const reverse = (str: string): string => str.split('').reverse().join('');

export default reverse;
