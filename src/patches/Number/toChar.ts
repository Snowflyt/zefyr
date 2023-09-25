import toChar from '../../Number/toChar';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Number {
    /**
     * Returns the character represented by the Unicode value of the number (using `String.fromCharCode`).
     *
     * @example
     * ```typescript
     * 65.toChar(); // => 'A'
     * 97.toChar(); // => 'a'
     * ```
     *
     * @see {@link String.fromCharCode}
     */
    toChar(): string;
  }
}

patch(Number).with({ toChar });
