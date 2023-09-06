type Falsy = false | 0 | 0n | '' | null | undefined;

/**
 * Returns true if the value is truthy. (i.e. not `false`, `0`, `-0`, `0n`, `NaN`, `''`, `null`, or `undefined`)
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isTruthy(true); // => true
 * isTruthy(1); // => true
 * isTruthy('a'); // => true
 * isTruthy([]); // => true
 * isTruthy({}); // => true
 * isTruthy(() => {}); // => true
 * isTruthy(' '); // => true
 * isTruthy(''); // => false
 * isTruthy(0); // => false
 * isTruthy(0n); // => false
 * isTruthy(NaN); // => false
 * isTruthy(false); // => false
 * isTruthy(null); // => false
 * isTruthy(undefined); // => false
 * ```
 *
 * @see {@link isFalsy}
 */
const isTruthy = <T>(value: T): value is Exclude<T, Falsy> => !!value;

export default isTruthy;
