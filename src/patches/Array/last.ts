import last from '../../Array/last';
import { patch } from '../../utils/patch';

import type { Last } from '../../Array/last';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * The last element of the ArrayT.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * arr.last; // => 3
     * ```
     */
    readonly last: Last<this>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * The last element of the ArrayT.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * arr.last; // => 3
     * ```
     */
    readonly last: Last<this>;
  }
}

patch(Array).withGetter({ last });
