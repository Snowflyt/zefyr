import seconds from '../../Duration/seconds';
import { patch } from '../../utils/patch';

declare global {
  interface Number {
    /**
     * The corresponding `Duration` represented in seconds.
     *
     * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
     *
     * @example
     * ```typescript
     * (2).seconds; // => 2n << (53n * 1n)
     * (2).seconds.asSeconds(); // => 2
     * (2).seconds + (3).milliseconds; // => 2n << (53n * 1n) + 3n << (53n * 0n)
     * ((2).seconds + (3).milliseconds).asSeconds(); // => 2.003
     * ((2).seconds + (3).milliseconds).asMilliseconds(); // => 2003
     * ```
     */
    readonly seconds: bigint;
  }
}

patch(Number).withGetter({ seconds });
