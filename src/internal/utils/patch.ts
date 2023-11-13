import { named } from './function';

// eslint-disable-next-line @typescript-eslint/ban-types
type Unboxed<T> = T extends String
  ? string
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Number
  ? number
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Boolean
  ? boolean
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Symbol
  ? symbol
  : // eslint-disable-next-line @typescript-eslint/ban-types
  T extends BigInt
  ? bigint
  : T;

type ClassType<T> = T extends string
  ? StringConstructor
  : T extends number
  ? NumberConstructor
  : T extends boolean
  ? BooleanConstructor
  : T extends symbol
  ? SymbolConstructor
  : T extends bigint
  ? BigIntConstructor
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]) => T;
type InstanceType<C> = C extends new (...args: unknown[]) => infer T
  ? T
  : C extends StringConstructor
  ? string
  : C extends NumberConstructor
  ? number
  : C extends BooleanConstructor
  ? boolean
  : C extends SymbolConstructor
  ? symbol
  : C extends BigIntConstructor
  ? bigint
  : never;

const stringRepresentation = (value: unknown): string => {
  if (typeof value === 'string') return `"${value}"`;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'symbol') return String(value);
  if (typeof value === 'bigint') return `${value}n`;
  if (typeof value === 'undefined') return 'undefined';
  if (typeof value === 'function') return `\`${value.name}\``;
  if (value === null) return 'null';
  return Object.prototype.toString.call(value).slice(8, -1);
};

/**
 * Monkey patch a class with new methods, properties or static methods.
 * @param class The class to patch.
 *
 * @example
 * ```typescript
 * // Declaration is required to keep type safety
 * declare global {
 *   interface Number {
 *     double(): number;
 *   }
 * }
 * patch(Number).with({ double: (n) => n * 2 }); // n :: number
 * (42).double(); // => 84
 * ```
 *
 * @example
 * ```typescript
 * class Holder<T> {
 *   constructor(public readonly value: T) {}
 * }
 * interface Holder<T> {
 *   readonly type: string;
 * }
 * patch(Holder).withGetter({ type: (holder) => typeof holder.value });
 * new Holder(42).type; // => 'number'
 * ```
 *
 * @example
 * ```typescript
 * declare global {
 *   interface ObjectConstructor {
 *     names<T>(o: T): (keyof T)[];
 *   }
 * }
 * patch(Object).withStatic({ names: (o) => Object.keys(o) });
 * Object.names({ a: 1, b: 2 }); // => ['a', 'b']
 * ```
 */
export const patch = <C>(classType: C) => {
  type T = InstanceType<C>;

  const result = {
    with: (namesAndValues: {
      [P in keyof T as P extends 'valueOf'
        ? never
        : T[P] extends (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...args: any[]
          ) => unknown
        ? P
        : never]?: T[P] extends (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...args: any[]
      ) => unknown
        ? (target: Unboxed<T>, ...args: Parameters<T[P]>) => ReturnType<T[P]>
        : never;
    }) => {
      for (const [n, value] of Object.entries(namesAndValues)) {
        if (typeof value !== 'function') throw new Error('value is not a function');
        const name = n as keyof T;
        const classT = classType as ClassType<T>;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (classT.prototype[name] === undefined)
          Object.defineProperty(classT.prototype, name, {
            value: named(
              typeof name === 'string' ? name : '',
              function (this: unknown, ...args: unknown[]) {
                return (value as (target: unknown, ...args: unknown[]) => unknown)(this, ...args);
              },
            ),
            configurable: true,
            enumerable: false,
            writable: true,
          });
        else
          console.warn(`Property "${String(name)}" already exists on \`${classT.name}.prototype\``);
      }
    },
    withGetter: (namesAndValues: {
      [P in keyof T as P extends 'valueOf' | 'toString' | 'toLocaleString' ? never : P]?: (
        target: Unboxed<T>,
      ) => T[P];
    }) => {
      for (const [n, value] of Object.entries(namesAndValues)) {
        const name = n as keyof T;
        const classT = classType as ClassType<T>;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (classT.prototype[name] === undefined)
          Object.defineProperty(classT.prototype, name, {
            get() {
              return (value as (target: unknown) => unknown)(this);
            },
            configurable: true,
            enumerable: false,
          });
        else
          console.warn(`Property "${String(name)}" already exists on \`${classT.name}.prototype\``);
      }
    },

    withStatic: (namesAndValues: {
      [P in keyof C as P extends 'prototype' | 'length' | 'name' | 'caller'
        ? never
        : C[P] extends (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...args: any[]
          ) => unknown
        ? P
        : never]?: C[P];
    }) => {
      for (const [n, value] of Object.entries(namesAndValues)) {
        if (typeof value !== 'function') throw new Error('value is not a function');
        const name = n as keyof typeof classType;
        if (classType[name] === undefined)
          Object.defineProperty(classType, name, {
            value: named(
              typeof name === 'string' ? name : '',
              value as (...args: unknown[]) => unknown,
            ),
            configurable: true,
            enumerable: false,
            writable: true,
          });
        else
          console.warn(
            globalThis === classType
              ? `Global ${typeof classType[name] === 'function' ? 'function' : 'value'} \`${String(
                  name,
                )}\` already exists`
              : `Property "${String(name)}" already exists on ${stringRepresentation(classType)}`,
          );
      }
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return result as C extends ClassType<any>
    ? typeof result
    : Omit<typeof result, 'with' | 'withGetter'>;
};
