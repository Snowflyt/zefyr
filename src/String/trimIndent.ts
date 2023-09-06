/**
 * Removes the minimum indent from a string.
 * The first and last lines are ignored.
 *
 * @example
 * ```typescript
 * const str = `
 *   hello
 *     world
 *     !
 * `;
 * const expected = `hello
 *   world
 *   !`;
 * trimIndent(str) === expected; // => true
 * ```
 */
const trimIndent = (str: string): string => {
  const lines = str.split('\n');
  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim() === '') continue;
    const indent = line.search(/\S/);
    if (indent !== -1) minIndent = Math.min(minIndent, indent);
  }
  return lines
    .map((line) => line.slice(minIndent))
    .join('\n')
    .trim();
};

export default trimIndent;
