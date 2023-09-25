import trimIndent from '../../String/trimIndent';
import { patch } from '../../internal/utils/patch';

declare global {
  interface String {
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
     * str.trimIndent() === expected; // => true
     * ```
     */
    trimIndent(): string;
  }
}

patch(String).with({ trimIndent });
