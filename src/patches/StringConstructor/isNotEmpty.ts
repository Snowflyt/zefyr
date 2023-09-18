import { patch } from '../../.internal/utils/patch';
import isNotEmpty from '../../StringConstructor/isNotEmpty';

declare global {
  interface StringConstructor {
    /**
     * Returns `true` if value is not null, undefined, or an empty string.
     *
     * @example
     * ```typescript
     * String.isNotEmpty(null); // => false
     * String.isNotEmpty(undefined); // => false
     * String.isNotEmpty(''); // => false
     * String.isNotEmpty(' '); // => true
     * String.isNotEmpty('a'); // => true
     * String.isNotEmpty(0); // => true
     * ```
     *
     * @example
     * ```typescript
     * const foo: number | null | '' = null;
     * if (String.isNotEmpty(foo)) {
     *   const bar = foo; // bar :: number
     * }
     * ```
     *
     * @see {@link isEmpty}
     */
    isNotEmpty<T>(value: T): value is Exclude<T, null | undefined | ''>;
  }
}

patch(String).withStatic({ isNotEmpty });
