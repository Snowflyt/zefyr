import cloneDeep from '../../global/cloneDeep';
import { patch } from '../../internal/utils/patch';

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

patch(globalThis).withStatic({ cloneDeep });
