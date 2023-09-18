import { patch } from '../../.internal/utils/patch';
import isBlank from '../../String/isBlank';

declare global {
  interface String {
    /**
     * Returns `true` if the string is empty or contains only blank characters.
     *
     * @example
     * ```typescript
     * ''.isBlank(); // => true
     * ' '.isBlank(); // => true
     * 'hello'.isBlank(); // => false
     * '  hello  '.isBlank(); // => false
     * ```
     */
    isBlank(): boolean;
  }
}

patch(String).with({ isBlank });
