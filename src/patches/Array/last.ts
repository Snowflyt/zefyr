import last from '../../Array/last';
import { patch } from '../../utils/patch';

import type { Last } from '../../Array/last';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Returns the last element of the array.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * arr.last(); // => 3
     * ```
     */
    last(): Last<this>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Returns the last element of the array.
     *
     * @example
     * ```typescript
     * const arr = [1, 2, 3];
     * arr.last(); // => 3
     * ```
     */
    last(): Last<this>;
  }
}

patch(Array).with({ last });
