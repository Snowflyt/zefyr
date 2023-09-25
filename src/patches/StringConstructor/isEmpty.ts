import isEmpty from '../../StringConstructor/isEmpty';
import { patch } from '../../internal/utils/patch';

declare global {
  interface StringConstructor {
    /**
     * Returns `true` if value is null, undefined, or an empty string.
     *
     * @example
     * ```typescript
     * String.isEmpty(null); // => true
     * String.isEmpty(undefined); // => true
     * String.isEmpty(''); // => true
     * String.isEmpty(' '); // => false
     * String.isEmpty('a'); // => false
     * String.isEmpty(0); // => false
     * ```
     *
     * @example
     * ```typescript
     * const foo: string | null | '' = null;
     * if (String.isEmpty(foo)) {
     *   const bar = foo; // bar :: null | ''
     * }
     * ```
     */
    isEmpty(value: unknown): value is null | undefined | '';
  }
}

patch(String).withStatic({ isEmpty });
