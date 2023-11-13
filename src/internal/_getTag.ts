/**
 * Returns the tag of the value (`Symbol.toStringTag` is omitted to get the raw tag).
 * @param value The value to get the tag of.
 *
 * @example
 * ```typescript
 * getTag({}); // => 'Object'
 * getTag([]); // => 'Array'
 * getTag(() => {}); // => 'Function'
 * getTag(async () => {}); // => 'AsyncFunction'
 * getTag(42); // => 'Number'
 * getTag(null); // => 'Null'
 * getTag(undefined); // => 'Undefined'
 * ```
 */
const getTag = (value: unknown): string => {
  if (value === null) return 'Null';
  if (value === undefined) return 'Undefined';

  // For objects with a toStringTag, return the raw tag
  if (Symbol.toStringTag in Object(value)) {
    const isOwn = Object.prototype.hasOwnProperty.call(value, Symbol.toStringTag);
    const tag = value[Symbol.toStringTag as keyof typeof value];

    let unmasked = false;
    try {
      value[Symbol.toStringTag as keyof typeof value] = undefined as never;
      unmasked = true;
      // eslint-disable-next-line no-empty
    } catch (e) {}

    const result = Object.prototype.toString.call(value).slice(8, -1);
    if (unmasked) {
      if (isOwn) value[Symbol.toStringTag as keyof typeof value] = tag;
      else delete value[Symbol.toStringTag as keyof typeof value];
    }
    return result;
  }

  return Object.prototype.toString.call(value).slice(8, -1);
};

export default getTag;
