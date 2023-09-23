import type { ListOf } from '../.internal/types/union';

export type MethodKey<T> = T extends string
  ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - TODO: Fix this
    | _MethodKey<
          string,
          ListOf<
            Exclude<
              keyof string,
              | 'capitalize'
              | 'isBlank'
              | 'isEmpty'
              | 'isNotBlank'
              | 'isNotEmpty'
              | 'reverse'
              | 'trimIndent'
            >
          >
        >
      | 'capitalize'
      | 'isBlank'
      | 'isEmpty'
      | 'isNotBlank'
      | 'isNotEmpty'
      | 'reverse'
      | 'trimIndent'
  : _MethodKey<T, ListOf<keyof T>>;
type _MethodKey<T, AS extends readonly (keyof T)[]> = AS extends readonly [
  infer A,
  ...infer B,
]
  ? A extends keyof T
    ? B extends readonly (keyof T)[]
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        T[A] extends (...args: any[]) => any
        ? _MethodKey<T, B> | A
        : _MethodKey<T, B>
      : never
    : never
  : never;

/**
 * Returns a function that when given a value returns the value of the specified property.
 * @param name The method to get.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: () => 3 };
 * const objs = [{ a: 1, b: 2, c: () => 3 }, { a: 4, b: 5, c: () => 6 }];
 * objs.map(method('c')); // => [3, 6]
 * [' a', ' b', ' c'].map(method('trim')); // => ['a', 'b', 'c']
 * method<typeof obj, 'c'>('c')(obj); // => 3
 * ```
 */
const invoke =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - TODO: Fix this


    <const T, const P extends MethodKey<T>>(name: P) =>
    // @ts-expect-error - TS doesn't know T[P] is a function
    (x: T): ReturnType<T[P]> =>
      (
        x[name as unknown as keyof T] as (...args: unknown[]) => unknown
      )() as never;

export default invoke;
