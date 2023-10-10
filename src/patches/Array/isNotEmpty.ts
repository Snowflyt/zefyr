import isNotEmpty from '../../Array/isNotEmpty';
import { patch } from '../../internal/utils/patch';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    /**
     * Returns `true` if length of the array is greater than `0`.
     *
     * @example
     * ```typescript
     * [].isNotEmpty(); // => false
     * [1, 2, 3].isNotEmpty(); // => true
     * ```
     */
    isNotEmpty<const AS extends unknown[]>(
      this: AS,
    ): this is Exclude<AS, [] | readonly []>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ReadonlyArray<T> {
    /**
     * Returns `true` if length of the array is greater than `0`.
     *
     * @example
     * ```typescript
     * [].isNotEmpty(); // => false
     * [1, 2, 3].isNotEmpty(); // => true
     * ```
     */
    isNotEmpty<const AS extends readonly unknown[]>(
      this: AS,
    ): this is Exclude<AS, [] | readonly []>;
  }
}

patch(Array).with({ isNotEmpty });
