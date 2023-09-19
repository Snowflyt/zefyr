import getTag from '../.internal/_getTag';

import isObject from './isObject';

/**
 * Returns `true` if the value is a function.
 * @param value The value to check.
 *
 * @example
 * ```typescript
 * isFunction(() => {}); // => true
 * isFunction(function() {}); // => true
 * isFunction(async () => {}); // => true
 * isFunction(function*() {}); // => true
 * isFunction(async function*() {}); // => true
 * isFunction(new Function()); // => true
 * isFunction(function*() {}.bind(null)); // => true
 * isFunction(async function*() {}.bind(null)); // => true
 * isFunction(new Proxy(() => {}, {})); // => true
 * isFunction(''); // => false
 * ```
 */
const isFunction = (
  value: unknown,
): value is (...args: unknown[]) => unknown => {
  if (!isObject(value)) return false;
  const tag = getTag(value);
  return (
    tag === 'Function' ||
    tag === 'AsyncFunction' ||
    tag === 'GeneratorFunction' ||
    tag === 'AsyncGeneratorFunction' ||
    tag === 'Proxy'
  );
};

export default isFunction;
