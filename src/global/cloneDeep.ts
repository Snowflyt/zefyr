import _ from 'lodash-es';

declare global {
  /**
   * Returns a deep clone of value (using `structuredClone` if available, otherwise using `_.cloneDeep`).
   *
   * This method is like `clone` except that it recursively clones value.
   *
   * @param value The value to recursively clone.
   *
   * @see {@link structuredClone}
   * @see {@link _.cloneDeep}
   */
  function cloneDeep<T>(value: T): T;
}

/**
 * Returns a deep clone of value (using `structuredClone` if available, otherwise using `_.cloneDeep`).
 *
 * This method is like `clone` except that it recursively clones value.
 *
 * @param value The value to recursively clone.
 *
 * @see {@link structuredClone}
 * @see {@link _.cloneDeep}
 */
const cloneDeep = <T>(value: T): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  if ((globalThis as any).structuredClone) return structuredClone(value);
  return _.cloneDeep(value);
};

export default cloneDeep;
