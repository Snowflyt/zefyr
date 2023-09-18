import { patch } from '../../.internal/utils/patch';
import isNonNullish from '../../global/isNonNullish';

declare global {
  /**
   * Exclude `null` and `undefined` from `T`.
   */
  type NonNullish<T> = Exclude<T, null | undefined>;

  /**
   * Returns `true` if the value is not null or undefined.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isNonNullish(null); // => false
   * isNonNullish(undefined); // => false
   * isNonNullish(''); // => true
   * isNonNullish(' '); // => true
   * isNonNullish('a'); // => true
   * isNonNullish(0); // => true
   * ```
   *
   * @example
   * ```typescript
   * const foo: string | null = null;
   * if (isNonNullish(foo)) {
   *   const bar = foo; // bar :: string
   * }
   * ```
   *
   * @see {@link isNullish}
   */
  function isNonNullish<T>(value: T): value is NonNullish<T>;
}

patch(globalThis).withStatic({ isNonNullish });
