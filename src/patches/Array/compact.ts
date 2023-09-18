import { patch } from '../../.internal/utils/patch';
import compact from '../../Array/compact';

import type { Compact } from '../../Array/compact';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Returns a new array without any falsy values. (i.e. `null`, `undefined`, `false`, `''`, `0`, `0n` or `NaN`)
     *
     * @example
     * ```typescript
     * const arr = [1, 2, undefined, 3, null, '', 0, false];
     * arr.compact(); // => [1, 2, 3]
     * ```
     */
    compact(): Compact<this>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Returns a new array without any falsy values. (i.e. `null`, `undefined`, `false`, `''`, `0`, `0n` or `NaN`)
     *
     * @example
     * ```typescript
     * const arr = [1, 2, undefined, 3, null];
     * arr.compact(); // => [1, 2, 3]
     * ```
     */
    compact(): Compact<this>;
  }
}

patch(Array).with({ compact });
