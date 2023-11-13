import isArray from '../global/isArray';
import isBuffer from '../global/isBuffer';
import isMap from '../global/isMap';
import isObject from '../global/isObject';
import isSet from '../global/isSet';

import getPrototype from './_getPrototype';
import getTag from './_getTag';
import isPrototype from './_isPrototype';

type TypedArray =
  | Float32Array
  | Float64Array
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array;
type TypedArrayConstructor =
  | Float32ArrayConstructor
  | Float64ArrayConstructor
  | Int8ArrayConstructor
  | Int16ArrayConstructor
  | Int32ArrayConstructor
  | Uint8ArrayConstructor
  | Uint8ClampedArrayConstructor
  | Uint16ArrayConstructor
  | Uint32ArrayConstructor;

const cloneableTags = {
  Arguments: true,
  Array: true,
  ArrayBuffer: true,
  DataView: true,
  Boolean: true,
  Date: true,
  Error: false,
  Float32Array: true,
  Float64Array: true,
  Function: false,
  Int8Array: true,
  Int16Array: true,
  Int32Array: true,
  Map: true,
  Number: true,
  Object: true,
  RegExp: true,
  Set: true,
  String: true,
  Symbol: true,
  Uint8Array: true,
  Uint8ClampedArray: true,
  Uint16Array: true,
  Uint32Array: true,
  WeakMap: false,
};

/**
 * Initializes an array clone.
 *
 * @private
 * @param array The array to clone.
 * @returns The initialized clone.
 */
const initCloneArray = <T>(array: readonly T[]): T[] => {
  const length = array.length;
  const result = new (array.constructor as ArrayConstructor)<T>(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && Object.hasOwnProperty.call(array, 'index')) {
    (result as unknown as { index: unknown }).index = (
      array as unknown as { index: unknown }
    ).index;
    (result as unknown as { input: unknown }).input = (
      array as unknown as { input: unknown }
    ).input;
  }
  return result;
};

/**
 * Copies the values of `from` to `to`.
 *
 * @private
 * @param from The array to copy values from.
 * @param to The array to copy values to.
 * @returns
 */
const copyArray = <T>(from: readonly T[], to: T[] = []): T[] => {
  let index = -1;
  const length = from.length;

  if (!to) to = Array(length);
  while (++index < length) to[index] = from[index]!;

  return to;
};

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param buffer The buffer to clone.
 * @param deep Specify a deep clone.
 * @returns The cloned buffer.
 */
const cloneBuffer = (buffer: Buffer, deep: boolean): Buffer => {
  if (deep) return Uint8Array.prototype.slice.call(buffer) as Buffer;

  const length = buffer.length;
  const result = Buffer.allocUnsafe
    ? Buffer.allocUnsafe(length)
    : Buffer.from(new ArrayBuffer(length));

  buffer.copy(result);
  return result;
};

/**
 * Initializes an object clone.
 *
 * @private
 * @param o The object to clone.
 * @returns The initialized clone.
 */
const initCloneObject = <O extends object>(o: O): O => {
  if (typeof o.constructor === 'function' && !isPrototype(o)) {
    const prototype = getPrototype(o);
    if (!isObject(prototype)) return {} as O;
    return Object.create(prototype);
  }
  return {} as O;
};

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param o The object to modify.
 * @param key The key of the property to assign.
 * @param value The value to assign.
 */
const assignValue = (o: object, key: PropertyKey, value: unknown) => {
  const objValue = o[key as keyof typeof o];
  if (
    !(
      Object.hasOwnProperty.call(o, key) &&
      (objValue === value || (objValue !== objValue && value !== value))
    ) ||
    (value === undefined && !(key in o))
  )
    o[key as keyof typeof o] = value as never;
};

/**
 * Copies properties of `from` to `to`.
 *
 * @private
 * @param from The object to copy properties from.
 * @param props The property identifiers to copy.
 * @param to The object to copy properties to.
 * @returns
 */
const copyObject = <O extends object, K extends keyof O>(
  from: O,
  props: readonly K[],
  to?: object,
): Omit<O, K> => {
  const isNew = !to;
  if (isNew) to = {};

  let index = -1;
  const length = props.length;

  while (++index < length) {
    const key = props[index]!;

    const newValue = from[key];

    if (isNew) to![key as keyof typeof to] = newValue as never;
    else assignValue(to!, key, newValue);
  }

  return to as Omit<O, K>;
};

/**
 * Creates an array of the own enumerable symbols of `o`.
 *
 * @private
 * @param o The object to query.
 * @returns The array of symbols.
 */
const getSymbols = !Object.getOwnPropertySymbols
  ? () => []
  : (o: unknown) => {
      if (o == null) return [];

      o = Object(o);
      return Object.getOwnPropertySymbols(o).filter((symbol) =>
        Object.propertyIsEnumerable.call(o, symbol),
      );
    };

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param from The object to copy symbols from.
 * @param to The object to copy symbols to.
 * @returns
 */
const copySymbols = (from: object, to?: object) => copyObject(from, getSymbols(from) as never, to);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param arrayBuffer The array buffer to clone.
 * @returns The cloned array buffer.
 */
const cloneArrayBuffer = (arrayBuffer: ArrayBuffer): ArrayBuffer => {
  const result = new (arrayBuffer.constructor as ArrayBufferConstructor)(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
};

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param dataView The data view to clone.
 * @param deep Specify a deep clone.
 * @returns The cloned data view.
 */
const cloneDataView = (dataView: DataView, deep?: boolean): DataView => {
  const buffer = deep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new (dataView.constructor as DataViewConstructor)(
    buffer,
    dataView.byteOffset,
    dataView.byteLength,
  );
};

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param typedArray The typed array to clone.
 * @param deep Specify a deep clone.
 * @returns The cloned typed array.
 */
const cloneTypedArray = <A extends TypedArray>(typedArray: A, deep?: boolean): A => {
  const buffer = deep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new (typedArray.constructor as TypedArrayConstructor)(
    buffer,
    typedArray.byteOffset,
    typedArray.length,
  ) as A;
};

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param regexp The regexp to clone.
 * @returns The cloned regexp.
 */
const cloneRegExp = (regexp: RegExp): RegExp => {
  const result = new (regexp.constructor as RegExpConstructor)(
    regexp.source,
    String(/\w*$/.exec(String(regexp))),
  );
  result.lastIndex = regexp.lastIndex;
  return result;
};

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param symbol The symbol object to clone.
 * @returns The cloned symbol object.
 */
const cloneSymbol = (symbol: symbol): symbol =>
  Symbol.prototype.valueOf ? Object(Symbol.prototype.valueOf.call(symbol)) : {};

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param o The object to clone.
 * @param tag The `toStringTag` of the object to clone.
 * @param deep Specify a deep clone.
 * @returns The initialized clone.
 */
const initCloneByTag = <O extends object>(o: O, tag: string, deep = false): O => {
  const Ctor = o.constructor as new (...args: never[]) => O;
  switch (tag) {
    case 'ArrayBuffer':
      return cloneArrayBuffer(o as ArrayBuffer) as O;

    case 'Boolean':
    case 'Date':
      return new Ctor(+o as never);

    case 'DataView':
      return cloneDataView(o as DataView, deep) as O;

    case 'Float32Array':
    case 'Float64Array':
    case 'Int8Array':
    case 'Int16Array':
    case 'Int32Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Uint16Array':
    case 'Uint32Array':
      return cloneTypedArray(o as TypedArray, deep) as O;

    case 'Map':
      return new Ctor();

    case 'Number':
    case 'String':
      return new Ctor(o as never);

    case 'RegExp':
      return cloneRegExp(o as RegExp) as O;

    case 'Set':
      return new Ctor();

    case 'Symbol':
      return cloneSymbol(o as unknown as symbol) as unknown as O;
  }
  return o;
};

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param o The object to query.
 * @returns The array of property names and symbols.
 */
const getAllKeys = (o: object): Array<string | symbol> => {
  const result: Array<string | symbol> = Object.keys(o);
  if (isArray(o)) return result;
  result.push(...getSymbols(o));
  return result;
};

/**
 * @private
 * @param array The array to iterate over.
 * @param iteratee The function invoked per iteration.
 * @returns Returns `array`.
 */
function arrayEach(
  array: readonly unknown[],
  iteratee: (value: unknown, index: number, array: readonly unknown[]) => unknown,
): unknown[] {
  let index = -1;
  const length = array.length;

  while (++index < length) if (iteratee(array[index], index, array) === false) break;

  return array as unknown[];
}

/**
 * The base implementation of `clone` and `cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param value The value to clone.
 * @param deep Whether to clone in a deep manner.
 * @param parent The parent object of `value`.
 * @param stack Tracks traversed objects and their clone counterparts.
 * @returns The cloned value.
 */
const baseClone = <T>(
  value: T,
  deep: boolean,
  parent?: object,
  stack?: Map<unknown, unknown>,
): T => {
  let result: T;

  if (!isObject(value)) return value;

  const isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value) as T;
    if (!deep) return copyArray(value, result as unknown as unknown[]) as T;
  } else {
    const tag = getTag(value);
    const isFunc = tag === 'Function' || tag === 'GeneratorFunction';

    if (isBuffer(value)) return cloneBuffer(value, deep) as T;

    if (tag === 'Object' || tag === 'Arguments' || (isFunc && !parent)) {
      result = isFunc ? ({} as T) : initCloneObject(value);
      if (!deep)
        return copySymbols(value, copyObject(value, Object.keys(value) as never, result!)) as T;
    } else {
      if (!cloneableTags[tag as keyof typeof cloneableTags]) return parent ? value : ({} as T);

      result = initCloneByTag(value, tag, deep);
    }
  }

  // Check for circular references and return its corresponding clone.
  stack || (stack = new Map());
  const stacked = stack.get(value);
  if (stacked) return stacked as T;
  stack.set(value, result);

  if (isSet(value))
    (value as Set<unknown>).forEach((subValue) => {
      (result as Set<unknown>).add(baseClone(subValue, deep, value, stack));
    });
  else if (isMap(value))
    (value as Map<unknown, unknown>).forEach((subValue, key) => {
      (result as Map<unknown, unknown>).set(key, baseClone(subValue, deep, value, stack));
    });

  const props = isArr ? undefined : getAllKeys(value);
  arrayEach(props ?? (value as readonly unknown[]), (subValue, key) => {
    if (props) {
      key = subValue as never;
      subValue = value[key as unknown as keyof typeof value];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result as never, key, baseClone(subValue, deep, value, stack));
  });
  return result;
};

export default baseClone;
