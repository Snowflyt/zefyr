import isNullish from '../../global/isNullish';
import { patch } from '../../internal/utils/patch';

declare global {
  /**
   * A type that is either null or undefined.
   */
  type Nullish = null | undefined;

  /**
   * Returns `true` if the value is null or undefined.
   * @param value The value to check.
   *
   * @example
   * ```typescript
   * isNullish(null); // => true
   * isNullish(undefined); // => true
   * isNullish(''); // => false
   * isNullish(' '); // => false
   * isNullish('a'); // => false
   * isNullish(0); // => false
   * ```
   *
   * @example
   * ```typescript
   * const foo: string | null = null;
   * if (isNullish(foo)) {
   *   const bar = foo; // bar :: null
   * }
   * ```
   */
  function isNullish(value: unknown): value is Nullish;
}

patch(globalThis).withStatic({ isNullish });
