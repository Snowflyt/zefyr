import first from '../../Array/first';
import { patch } from '../../utils/patch';

import type { First } from '../../Array/first';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Returns the first element of the array.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * arr.first(); // => 1
     * ```
     */
    first(): First<this>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Returns the first element of the array.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * arr.first(); // => 1
     * ```
     */
    first(): First<this>;
  }
}

patch(Array).with({ first });
