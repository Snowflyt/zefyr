import isNotBlank from '../../String/isNotBlank';
import { patch } from '../../utils/patch';

declare global {
  interface String {
    /**
     * Returns true if the string is not empty and contains at least one non-blank character.
     *
     * @example
     * ```typescript
     * ''.isNotBlank(); // => false
     * ' '.isNotBlank(); // => false
     * 'hello'.isNotBlank(); // => true
     * '  hello  '.isNotBlank(); // => true
     * ```
     *
     * @see {@link String#isBlank}
     */
    isNotBlank(): boolean;
  }
}

patch(String).with({ isNotBlank });
