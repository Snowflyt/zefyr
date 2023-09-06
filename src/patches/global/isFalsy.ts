import isFalsy from '../../global/isFalsy';
import { patch } from '../../utils/patch';

declare global {
  /**
   * Falsy values in TypeScript.
   *
   * **Note:** NaN is a falsy value, but it is not included in this type, as it cannot be represented as a type literal.
   */
  type Falsy = false | 0 | 0n | '' | null | undefined;

  /**
   * Returns true if the value is falsy. (i.e. `false`, `0`, `-0`, `0n`, `NaN`, `''`, `null`, or `undefined`)
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isFalsy(false); // => true
   * isFalsy(0); // => true
   * isFalsy(0n); // => true
   * isFalsy(NaN); // => true
   * isFalsy(''); // => true
   * isFalsy(null); // => true
   * isFalsy(undefined); // => true
   * isFalsy(' '); // => false
   * isFalsy([]); // => false
   * isFalsy({}); // => false
   * isFalsy(() => {}); // => false
   * isFalsy('a'); // => false
   * ```
   */
  function isFalsy(value: unknown): value is Falsy;
}

patch(globalThis).withStatic({ isFalsy });
