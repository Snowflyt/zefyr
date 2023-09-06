import asSeconds from '../../Duration/asSeconds';
import { patch } from '../../utils/patch';

declare global {
  interface BigInt {
    /**
     * Returns the total number of seconds of the `Duration`.
     *
     * @example
     * ```typescript
     * (2).seconds.asSeconds(); // => 2
     * ((2).seconds + (3).milliseconds).asSeconds(); // => 2.003
     * ```
     */
    asSeconds(): number;
  }
}

patch(BigInt).with({ asSeconds });
