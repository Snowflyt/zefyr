import minutes from '../../Duration/minutes';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * The corresponding `Duration` represented in minutes.
     *
     * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
     *
     * @example
     * ```typescript
     * (2).minutes; // => 2n << (53n * 2n)
     * (2).minutes.asMinutes(); // => 2
     * (2).minutes + (3).seconds; // => 2n << (53n * 2n) + 3n << (53n * 1n)
     * ((2).minutes + (3).seconds).asMinutes(); // => 2.05
     * ((2).minutes + (3).seconds).asSeconds(); // => 123
     * ```
     */
    readonly minutes: bigint;
  }
}

patch(Number).withGetter({ minutes });
