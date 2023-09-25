import milliseconds from '../../Duration/milliseconds';
import { patch } from '../../internal/utils/patch';

declare global {
  interface Number {
    /**
     * The corresponding `Duration` represented in milliseconds.
     *
     * `Duration`s are represented as a `bigint` with 53 bits per unit internally.
     *
     * @example
     * ```typescript
     * (2).milliseconds; // => 2n << (53n * 0n)
     * (2).milliseconds.asMilliseconds(); // => 2
     * (2).seconds + (3).milliseconds; // => 2n << (53n * 1n) + 3n << (53n * 0n)
     * ((2).seconds + (3).milliseconds).asSeconds(); // => 2.003
     * ((2).seconds + (3).milliseconds).asMilliseconds(); // => 2003
     * ```
     */
    readonly milliseconds: bigint;
  }
}

patch(Number).withGetter({ milliseconds });
