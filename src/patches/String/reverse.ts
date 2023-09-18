import { patch } from '../../.internal/utils/patch';
import reverse from '../../String/reverse';

declare global {
  interface String {
    /**
     * Returns the reversed string.
     *
     * @example
     * ```typescript
     * 'hello'.reverse(); // => 'olleh'
     * ```
     */
    reverse(): string;
  }
}

patch(String).with({ reverse });
