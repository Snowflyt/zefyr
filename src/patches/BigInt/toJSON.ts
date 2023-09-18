import { patch } from '../../.internal/utils/patch';
import toJSON from '../../BigInt/toJSON';

declare global {
  interface BigInt {
    /**
     * Returns the string representation of the BigInt.
     *
     * It is an alias of `BigInt#toString`, and is used by `JSON.stringify` to convert the BigInt to a string.
     *
     * @example
     * ```typescript
     * const bigInt = 10n;
     * console.log(bigInt.toJSON()); // => "10"
     * ```
     */
    toJSON(): string;
  }
}

patch(BigInt).with({ toJSON });
