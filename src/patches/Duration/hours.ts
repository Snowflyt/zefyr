import hours from '../../Duration/hours';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * The corresponding `Duration` represented in hours.
     *
     * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
     *
     * @example
     * ```typescript
     * (2).hours; // => 2n << (53n * 3n)
     * (2).hours.asHours(); // => 2
     * (2).hours + (3).minutes; // => 2n << (53n * 3n) + 3n << (53n * 2n)
     * ((2).hours + (3).minutes).asHours(); // => 2.05
     * ((2).hours + (3).minutes).asMinutes(); // => 123
     * ```
     */
    readonly hours: bigint;
  }
}

patch(Number).withGetter({ hours });
