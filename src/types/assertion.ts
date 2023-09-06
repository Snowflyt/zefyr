import type { ListOf } from './union';

export type Cast<T, U> = T extends U ? T : U;

/**
 * Returns whether the type is exact (i.e. has only one possible value).
 *
 * @example
 * ```typescript
 * type R = IsExact<1>; // R :: true
 * type R = IsExact<1 | 2>; // R :: false
 * type R = IsExact<{ a: 1; b: { c: readonly [4, 5, 6]; d: [true, false] } }>; // R :: true
 * type R = IsExact<{ a: number }>; // R :: false
 * type R = IsExact<{ b: 4 | 5 }>; // R :: false
 * type R = IsExact<{ a: 1; b: 2 }>; // R :: true
 * type R = IsExact<[true] | [true, false]>; // R :: false
 * type R = IsExact<[true, false, 3, 4, 5]>; // R :: true
 * ```
 */
export type IsExact<T> = ListOf<T>['length'] extends 1
  ? IsExactPrimitive<T> extends true
    ? true
    : IsExactObject<T> extends true
    ? true
    : IsExactArray<T> extends true
    ? true
    : false
  : false;
type IsExactObject<T> = ListOf<T>['length'] extends 1
  ? T extends object
    ? IsLiteral<keyof T> extends true
      ? {
          [P in keyof T]: IsExact<T[P]> extends true ? true : false;
        }[keyof T] extends true
        ? true
        : false
      : false
    : false
  : false;
type IsExactArray<AS> = ListOf<AS>['length'] extends 1
  ? AS extends readonly [infer AHead, ...infer ATail]
    ? IsExact<AHead> extends true
      ? IsExactArray<ATail>
      : false
    : AS extends []
    ? true
    : false
  : false;
type IsExactPrimitive<T> = ListOf<T>['length'] extends 1
  ? T extends Primitive
    ? IsLiteral<T> extends true
      ? true
      : T extends undefined | null | void
      ? true
      : false
    : false
  : false;

export type IsLiteral<T extends Primitive> = IsNotFalse<IsLiteralUnion<T>>;
export type IsNotFalse<T extends boolean> = [T] extends [false] ? false : true;
type IsLiteralUnion<T> =
  | IsStringLiteral<T>
  | IsNumericLiteral<T>
  | IsBooleanLiteral<T>
  | IsSymbolLiteral<T>;
export type IsStringLiteral<T> = LiteralCheck<T, string>;
export type IsNumericLiteral<T> = LiteralChecks<T, Numeric>;
export type IsBooleanLiteral<T> = LiteralCheck<T, boolean>;
export type IsSymbolLiteral<T> = LiteralCheck<T, symbol>;
type LiteralCheck<T, LiteralType extends Primitive> = IsNever<T> extends false
  ? [T] extends [LiteralType]
    ? [LiteralType] extends [T]
      ? false
      : true
    : false
  : false;
type LiteralChecks<T, LiteralUnionType> = IsNotFalse<
  LiteralUnionType extends Primitive ? LiteralCheck<T, LiteralUnionType> : never
>;
export type IsNever<T> = [T] extends [never] ? true : false;

/* Helper types */

type Numeric = number | bigint;
type Primitive = string | number | bigint | boolean | symbol | null | undefined;
