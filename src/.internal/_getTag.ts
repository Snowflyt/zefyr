const nullTag = 'Null';
const undefinedTag = 'Undefined';

const getTag = (value: unknown): string => {
  if (value === null) return nullTag;
  if (value === undefined) return undefinedTag;

  // For objects with a toStringTag, return the raw tag
  if (Symbol.toStringTag in Object(value)) {
    const isOwn = Object.prototype.hasOwnProperty.call(
      value,
      Symbol.toStringTag,
    );
    const tag = value[Symbol.toStringTag as keyof typeof value];

    let unmasked = false;
    try {
      value[Symbol.toStringTag as keyof typeof value] = undefined as never;
      unmasked = true;
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
