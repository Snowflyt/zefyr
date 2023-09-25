import isEmpty from '../../String/isEmpty';
import { patch } from '../../internal/utils/patch';

declare global {
  interface String {
    /**
     * Returns `true` if the string is empty.
     *
     * @example
     * ```typescript
     * ''.isEmpty(); // => true
     * ' '.isEmpty(); // => false
     * ```
     *
     * @example
     * ```typescript
     * const foo = 'hello';
     * if (foo.isEmpty()) {
     *   const bar = foo; // bar :: ''
     * }
     * ```
     */
    isEmpty(): this is '';
  }
}

patch(String).with({ isEmpty });
