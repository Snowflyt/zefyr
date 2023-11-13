export type StrictKeys<T extends object> = keyof T extends symbol
  ? []
  : `${Exclude<keyof T, symbol>}`[];

/**
 * Returns the names of the enumerable string properties and methods of an object (using `Object.keys`, but with stricter TypeScript typings).
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3, 5: 42, [Symbol()]: 'symbol' };
 * keysS(obj); // => ['5', 'a', 'b', 'c']
 * const keys = keysS(obj); // keys :: ('5' | 'a' | 'b' | 'c')[]
 * ```
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3, 5: 42, [Symbol()]: 'symbol' };
 * for (const key of keysS(obj)) {
 *   console.log(obj[key]); // No type error
 * }
 * ```
 *
 * @see {@link Object.keys}
 */
const keysS = <T extends object>(o: T): StrictKeys<T> => Object.keys(o) as StrictKeys<T>;

export default keysS;
