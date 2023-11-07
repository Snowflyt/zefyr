import baseClone from '../internal/_baseClone';

/**
 * Returns a deep clone of value.
 *
 * This method is like `clone` except that it recursively clones value.
 *
 * @param value The value to recursively clone.
 *
 * @example
 * ```typescript
 * const objs = [{ a: 1 }, { b: 2 }];
 * const deep = cloneDeep(objs);
 * deep[0] === objs[0]; // => false
 * ```
 *
 * @see {@link clone}
 */
const cloneDeep = <T>(value: T): T => baseClone(value, true);

export default cloneDeep;
