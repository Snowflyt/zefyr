import { zTag } from '../.internal/zTag';

import equals from './equals';
import is from './is';

import type { Primitive } from './isPrimitive';
import type { Distribute } from '../.internal/types/distribute';

type Escape<
  S extends string | number,
  TQuoteType extends 'single' | 'double' = 'single',
> = `${S}` extends `${infer L}${infer R}`
  ? L extends (TQuoteType extends 'single' ? "'" : '"')
    ? `\\${L}${Escape<R>}`
    : L extends '\\'
    ? `\\\\${Escape<R>}`
    : `${L}${Escape<R>}`
  : S;

type Alphabet =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

type IsIdentifierName<S extends string> = `${S}` extends `${infer L}${infer R}`
  ? L extends Alphabet
    ? _IsIdentifierName<R>
    : L extends '_'
    ? _IsIdentifierName<R>
    : L extends '$'
    ? _IsIdentifierName<R>
    : false
  : true;
type _IsIdentifierName<S extends string> = `${S}` extends `${infer L}${infer R}`
  ? L extends ' ' | '\t' | '\n' | '\r' | '\v' | '\f'
    ? false
    : L extends `${number}`
    ? _IsIdentifierName<R>
    : L extends '_'
    ? _IsIdentifierName<R>
    : L extends '$'
    ? _IsIdentifierName<R>
    : L extends Alphabet
    ? _IsIdentifierName<R>
    : false
  : true;

type ValueOf<T> = T[keyof T];

type ArrayKeys = keyof [];

type ParsePath<S extends string> = _ParsePath<S>;
type _ParsePath<
  S extends string,
  TPrev extends string = '',
  TPrevChar extends string = '',
  TInString extends boolean = false,
  TStringQuote extends "'" | '"' = "'",
  TResult extends readonly string[] = [],
> = S extends `${infer L}${infer R}`
  ? TInString extends true
    ? L extends '\\'
      ? TPrevChar extends '\\'
        ? _ParsePath<R, `${TPrev}${L}`, L, true, TStringQuote, TResult>
        : _ParsePath<R, TPrev, L, true, TStringQuote, TResult>
      : L extends TStringQuote
      ? TPrevChar extends '\\'
        ? _ParsePath<R, `${TPrev}${L}`, L, true, TStringQuote, TResult>
        : _ParsePath<R, '', L, false, TStringQuote, AppendPrev<TResult, TPrev>>
      : _ParsePath<R, `${TPrev}${L}`, L, true, TStringQuote, TResult>
    : L extends "'" | '"'
    ? TPrevChar extends '['
      ? _ParsePath<R, '', L, true, L, TResult>
      : _ParsePath<R, '', L, true, L, AppendPrev<TResult, TPrev>>
    : L extends '['
    ? _ParsePath<R, '', L, false, TStringQuote, AppendPrev<TResult, TPrev>>
    : L extends ']'
    ? TPrevChar extends "'" | '"'
      ? _ParsePath<R, '', L, false, TStringQuote, TResult>
      : _ParsePath<R, '', L, false, TStringQuote, AppendPrev<TResult, TPrev>>
    : L extends '.'
    ? _ParsePath<R, '', L, false, TStringQuote, AppendPrev<TResult, TPrev>>
    : _ParsePath<R, `${TPrev}${L}`, L, false, TStringQuote, TResult>
  : AppendPrev<TResult, TPrev>;
type AppendPrev<AS extends readonly string[], S extends string> = S extends ''
  ? AS
  : [...AS, S];

const parsePath = <const P extends string>(path: P): ParsePath<P> => {
  let prev = '';
  let prevChar = '';
  let inString = false;
  let stringQuote: "'" | '"' = "'";
  const result: string[] = [];

  const appendPrev = () => {
    if (prev) {
      result.push(prev);
      prev = '';
    }
  };

  for (const char of path) {
    if (inString) {
      if (char === '\\') {
        if (prevChar === '\\') prev += char;
        prevChar = char;
        continue;
      }
      if (char === stringQuote) {
        if (prevChar === '\\') {
          prev += char;
          prevChar = char;
          continue;
        }
        inString = false;
        appendPrev();
        continue;
      }
      prev += char;
      prevChar = char;
      continue;
    }
    if (char === "'" || char === '"') {
      if (prevChar === '[') {
        stringQuote = char;
        inString = true;
        prevChar = char;
        continue;
      }
      appendPrev();
      stringQuote = char;
      inString = true;
      prevChar = char;
      continue;
    }
    if (char === '[') {
      appendPrev();
      prevChar = char;
      continue;
    }
    if (char === ']') {
      appendPrev();
      prevChar = char;
      continue;
    }
    if (char === '.') {
      appendPrev();
      prevChar = char;
      continue;
    }
    prev += char;
    prevChar = char;
  }
  appendPrev();

  return result as ParsePath<P>;
};

export type BasePath<O extends object> = _BasePath<
  Distribute<[O]>[0]
> extends `.${infer R}`
  ? R
  : _BasePath<Distribute<[O]>[0]>;
type _BasePath<O> = __BasePath<Distribute<[O]>[0]>;
type __BasePath<O> = O extends readonly Primitive[]
  ? number extends O['length']
    ? `[${number}]`
    : undefined extends _BasePathOfObjectLike<O>
    ? Exclude<_BasePathOfObjectLike<O>, undefined>
    : _BasePathOfObjectLike<O>
  : O extends object
  ? undefined extends _BasePathOfObjectLike<O>
    ? Exclude<_BasePathOfObjectLike<O>, undefined>
    : _BasePathOfObjectLike<O>
  : '';
type _BasePathOfObjectLike<O extends object> = ValueOf<{
  [P in keyof O as P extends string | number
    ? O extends readonly unknown[]
      ? number extends O['length']
        ? P extends Exclude<ArrayKeys, number>
          ? never
          : P
        : P extends ArrayKeys
        ? never
        : P
      : P
    : never]: P extends string | number
    ? `${P}` extends `${number}`
      ? `[${P}]` | `[${P}]${_BasePath<O[P]>}`
      : P extends string
      ? IsIdentifierName<P> extends true
        ? `.${P}` | `.${P}${_BasePath<O[P]>}`
        : `['${Escape<P>}']` | `['${Escape<P>}']${_BasePath<O[P]>}`
      : never
    : never;
}>;

export type BasePathArray<O extends object> = _BasePathArray<
  Distribute<[O]>[0]
>;
type _BasePathArray<O> = __BasePathArray<Distribute<[O]>[0]>;
type __BasePathArray<O> = O extends object
  ? undefined extends _BasePathArrayOfObjectLike<O>
    ? Exclude<_BasePathArrayOfObjectLike<O>, undefined>
    : _BasePathArrayOfObjectLike<O>
  : readonly [];
type _BasePathArrayOfObjectLike<O extends object> = ValueOf<{
  [P in keyof O as P extends string | number
    ? O extends readonly unknown[]
      ? number extends O['length']
        ? P extends Exclude<ArrayKeys, number>
          ? never
          : P
        : P extends ArrayKeys
        ? never
        : P
      : P
    : never]: P extends string | number
    ? `${P}` extends `${number}`
      ? readonly [`${P}`] | readonly [`${P}`, ..._BasePathArray<O[P]>]
      : P extends string
      ? readonly [P] | readonly [P, ..._BasePathArray<O[P]>]
      : readonly []
    : readonly [];
}>;

type GetByPath<O extends object, P> = _GetByPath<
  Distribute<[O]>[0],
  P extends string ? ParsePath<P> : P extends readonly string[] ? P : never
>;
type _GetByPath<O, P extends readonly unknown[]> = P extends readonly []
  ? O
  : P extends readonly [infer L, ...infer R]
  ? undefined extends O
    ? __GetByPath<Exclude<O, undefined>, L, R> | undefined
    : __GetByPath<O, L, R>
  : undefined;
type __GetByPath<
  O,
  L,
  R extends readonly unknown[],
> = O extends readonly unknown[]
  ? `${number}` extends L
    ? _GetByPath<O[number], R> | undefined
    : L extends `${number}`
    ? number extends O['length']
      ? _GetByPath<O[number], R> | undefined
      : L extends keyof O
      ? _GetByPath<O[L], R>
      : undefined
    : L extends keyof O
    ? _GetByPath<O[L], R>
    : undefined
  : L extends keyof O
  ? _GetByPath<O[L], R>
  : undefined;

type PathExtension<P> = <O extends object>(
  value: P extends BasePath<O> | BasePathArray<O> ? GetByPath<O, P> : never,
) => (o: O) => boolean;
type PathExtensionW<P> = <O extends object>(
  value: P extends BasePath<O> | BasePathArray<O> ? unknown : never,
) => (o: O) => boolean;

type PathExtensions<P> = {
  /**
   * Returns `true` if the value of the path satisfies the predicate.
   * @param pred The predicate to satisfy.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }];
   * objs.filter(path('a.b[0]').satisfies((value) => value > 1)); // => [{ a: { b: [4, 5, 6] } }]
   * ```
   */
  satisfies: <O extends object>(
    pred: P extends BasePath<O> | BasePathArray<O>
      ? (value: GetByPath<O, P>) => boolean
      : never,
  ) => (o: O) => boolean;
  /**
   * Returns `true` if the value of the path is equal to the given value (using `===`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }];
   * objs.filter(path('a.b[0]').eq(1)); // => [{ a: { b: [1, 2, 3] } }]
   * ```
   */
  eq: PathExtension<P>;
  /**
   * Returns `true` if the value of the path is equal to the given value (using `===`).
   *
   * It is the same as `eq` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }];
   * objs.filter(path('a.b[0]').eqW(1)); // => [{ a: { b: [1, 2, 3] } }]
   * ```
   */
  eqW: PathExtensionW<P>;
  /**
   * Returns `true` if the value of the path is not equal to the given value (using `!==`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }];
   * objs.filter(path('a.b[0]').notEq(1)); // => [{ a: { b: [4, 5, 6] } }]
   * ```
   */
  notEq: PathExtension<P>;
  /**
   * Returns `true` if the value of the path is not equal to the given value (using `!==`).
   *
   * It is the same as `notEq` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }];
   * objs.filter(path('a.b[0]').notEqW(1)); // => [{ a: { b: [4, 5, 6] } }]
   * ```
   */
  notEqW: PathExtensionW<P>;
  /**
   * Returns `true` if the value of the path is loosely equal to the given value (using `==`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: ['1', '2', '3'] } }];
   * objs.filter(path('a.b[0]').looselyEq(1)); // => [{ a: { b: [1, 2, 3] } }, { a: { b: ['1', '2', '3'] } }]
   * ```
   */
  looselyEq: PathExtension<P>;
  /**
   * Returns `true` if the value of the path is loosely equal to the given value (using `==`).
   *
   * It is the same as `looselyEq` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: ['1', '2', '3'] } }];
   * objs.filter(path('a.b[0]').looselyEqW(1)); // => [{ a: { b: [1, 2, 3] } }, { a: { b: ['1', '2', '3'] } }]
   * ```
   */
  looselyEqW: PathExtensionW<P>;
  /**
   * Returns `true` if the value of the path is not loosely equal to the given value (using `!=`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: ['1', '2', '3'] } }];
   * objs.filter(path('a.b[0]').notLooselyEq(1)); // => []
   * ```
   */
  notLooselyEq: PathExtension<P>;
  /**
   * Returns `true` if the value of the path is not loosely equal to the given value (using `!=`).
   *
   * It is the same as `notLooselyEq` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: ['1', '2', '3'] } }];
   * objs.filter(path('a.b[0]').notLooselyEqW(1)); // => []
   * ```
   */
  notLooselyEqW: PathExtensionW<P>;
  /**
   * Returns `true` if the value of the path is equal to the given value (using `equals`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: ['1', '2', '3'] } }];
   * objs.filter(path('a.b').equals([1, 2, 3])); // => [{ a: { b: [1, 2, 3] } }]
   * ```
   *
   * @see {@link equals}
   */
  equals: PathExtension<P>;
  /**
   * Returns `true` if the value of the path is equal to the given value (using `equals`).
   *
   * It is the same as `equals` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: ['1', '2', '3'] } }];
   * objs.filter(path('a.b').equalsW([1, 2, 3])); // => [{ a: { b: [1, 2, 3] } }]
   * ```
   *
   * @see {@link equals}
   */
  equalsW: PathExtensionW<P>;
  /**
   * Returns `true` if the value of the path is not equal to the given value (using `equals`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: ['1', '2', '3'] } }];
   * objs.filter(path('a.b').notEquals([1, 2, 3])); // => [{ a: { b: ['1', '2', '3'] } }]
   * ```
   *
   * @see {@link equals}
   */
  notEquals: PathExtension<P>;
  /**
   * Returns `true` if the value of the path is not equal to the given value (using `equals`).
   *
   * It is the same as `notEquals` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: ['1', '2', '3'] } }];
   * objs.filter(path('a.b').notEqualsW([1, 2, 3])); // => [{ a: { b: ['1', '2', '3'] } }]
   * ```
   *
   * @see {@link equals}
   */
  notEqualsW: PathExtensionW<P>;
  /**
   * Returns `true` if the value of the path is greater than the given value (using `is`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [0, 2, 3] } }, { a: { b: [-0, 5, 6] } }
   * objs.filter(path('a.b[0]').is(-0)); // => [{ a: { b: [-0, 5, 6] } }]
   * ```
   *
   * @see {@link is}
   */
  is: PathExtension<P>;
  /**
   * Returns `true` if the value of the path is greater than the given value (using `is`).
   *
   * It is the same as `is` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [0, 2, 3] } }, { a: { b: [-0, 5, 6] } }
   * objs.filter(path('a.b[0]').isW(-0)); // => [{ a: { b: [-0, 5, 6] } }]
   * ```
   *
   * @see {@link is}
   */
  isW: PathExtensionW<P>;
  /**
   * Returns `true` if the value of the path is not equal to the given value (using `is`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [0, 2, 3] } }, { a: { b: [-0, 5, 6] } }
   * objs.filter(path('a.b[0]').isNot(-0)); // => [{ a: { b: [0, 2, 3] } }]
   * ```
   *
   * @see {@link is}
   */
  isNot: PathExtension<P>;
  /**
   * Returns `true` if the value of the path is not equal to the given value (using `is`).
   *
   * It is the same as `isNot` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [0, 2, 3] } }, { a: { b: [-0, 5, 6] } }
   * objs.filter(path('a.b[0]').isNotW(-0)); // => [{ a: { b: [0, 2, 3] } }]
   * ```
   *
   * @see {@link is}
   */
  isNotW: PathExtensionW<P>;
  /**
   * Returns `true` if the value of the path is greater than the given value (using `>`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }
   * objs.filter(path('a.b[0]').gt(1)); // => [{ a: { b: [4, 5, 6] } }]
   * ```
   */
  gt: PathExtension<P>;
  /**
   * Returns `true` if the value of the path is greater than the given value (using `>`).
   *
   * It is the same as `gt` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }
   * objs.filter(path('a.b[0]').gtW(1)); // => [{ a: { b: [4, 5, 6] } }]
   * ```
   */
  gtW: PathExtensionW<P>;
  /**
   * Returns `true` if the value of the path is greater than or equal to the given value (using `>=`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }
   * objs.filter(path('a.b[0]').gte(1)); // => [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }]
   * ```
   */
  gte: PathExtension<P>;
  /**
   * Returns `true` if the value of the path is greater than or equal to the given value (using `>=`).
   *
   * It is the same as `gte` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }
   * objs.filter(path('a.b[0]').gteW(1)); // => [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }]
   * ```
   */
  gteW: PathExtensionW<P>;
  /**
   * Returns `true` if the value of the path is less than the given value (using `<`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }
   * objs.filter(path('a.b[0]').lt(4)); // => [{ a: { b: [1, 2, 3] } }]
   * ```
   */
  lt: PathExtension<P>;
  /**
   * Returns `true` if the value of the path is less than the given value (using `<`).
   *
   * It is the same as `lt` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }
   * objs.filter(path('a.b[0]').ltW(4)); // => [{ a: { b: [1, 2, 3] } }]
   * ```
   */
  ltW: PathExtensionW<P>;
  /**
   * Returns `true` if the value of the path is less than or equal to the given value (using `<=`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }
   * objs.filter(path('a.b[0]').lte(4)); // => [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }]
   * ```
   */
  lte: PathExtension<P>;
  /**
   * Returns `true` if the value of the path is less than or equal to the given value (using `<=`).
   *
   * It is the same as `lte` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }
   * objs.filter(path('a.b[0]').lteW(4)); // => [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }]
   * ```
   */
  lteW: PathExtensionW<P>;
};

/**
 * Returns a function that when given an object returns the value of the specified path.
 *
 * The function also has a number of extensions that can be used to compare the value of the path.
 * @param path The path to get, can be either a string or an array of strings.
 *
 * @example
 * ```typescript
 * const obj = { a: { b: [1, 2, 3] } };
 * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }];
 * objs.map(path('a.b[0]')); // => [1, 4]
 * objs.map(path(['a', 'b', '0'])); // => [1, 4]
 * path<typeof obj, 'a.b[0]'>('a.b[0]')(obj); // => 1
 * path<typeof obj, ['a', 'b', '0']>(['a', 'b', '0'])(obj); // => 1
 * ```
 *
 * @example
 * ```typescript
 * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }];
 * objs.filter(path('a.b[0]').eq(1)); // => [{ a: { b: [1, 2, 3] } }]
 * objs.filter(path(['a', 'b', '0']).eq(1)); // => [{ a: { b: [1, 2, 3] } }]
 * ```
 */
export type Path<O extends object, P> = ((
  o: O,
) => P extends BasePath<O> | BasePathArray<O> ? GetByPath<O, P> : undefined) &
  PathExtensions<P> & {
    [zTag]: 'Path';
  };

/**
 * Returns a function that when given an object returns the value of the specified path.
 *
 * The function also has a number of extensions that can be used to compare the value of the path.
 * @param path The path to get, can be either a string or an array of strings.
 *
 * @example
 * ```typescript
 * const obj = { a: { b: [1, 2, 3] } };
 * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }];
 * objs.map(path('a.b[0]')); // => [1, 4]
 * objs.map(path(['a', 'b', '0'])); // => [1, 4]
 * path<typeof obj, 'a.b[0]'>('a.b[0]')(obj); // => 1
 * path<typeof obj, ['a', 'b', '0']>(['a', 'b', '0'])(obj); // => 1
 * ```
 *
 * @example
 * ```typescript
 * const objs = [{ a: { b: [1, 2, 3] } }, { a: { b: [4, 5, 6] } }];
 * objs.filter(path('a.b[0]').eq(1)); // => [{ a: { b: [1, 2, 3] } }]
 * objs.filter(path(['a', 'b', '0']).eq(1)); // => [{ a: { b: [1, 2, 3] } }]
 * ```
 */
const path = <
  const O extends object,
  const P extends object extends O
    ? string | readonly string[]
    : BasePath<O> | BasePathArray<O>,
>(
  path: P,
): Path<O, P> => {
  const result = (o: object): unknown => {
    const parsedPath: string[] = Array.isArray(path)
      ? path
      : parsePath(path as string);
    let result: unknown = o;
    for (const key of parsedPath) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        result = (result as any)[key];
      } catch (e) {
        return undefined;
      }
    }
    return result;
  };

  const _satisfies = (pred: (value: unknown) => boolean) => (o: object) =>
    pred(result(o));
  const _eq = (value: unknown) => (o: object) => value === result(o);
  const _eqW = (value: unknown) => _eq(value);
  const _notEq = (value: unknown) => (o: object) => value !== result(o);
  const _notEqW = (value: unknown) => _notEq(value);
  const _looselyEq = (value: unknown) => (o: object) => result(o) == value;
  const _looselyEqW = (value: unknown) => _looselyEq(value);
  const _notLooselyEq = (value: unknown) => (o: object) => result(o) != value;
  const _notLooselyEqW = (value: unknown) => _notLooselyEq(value);
  const _equals = (value: unknown) => (o: object) => equals(value, result(o));
  const _equalsW = (value: unknown) => _equals(value);
  const _notEquals = (value: unknown) => (o: object) =>
    !equals(value, result(o));
  const _notEqualsW = (value: unknown) => _notEquals(value);
  const _is = (value: unknown) => (o: object) => is(value, result(o));
  const _isW = (value: unknown) => _is(value);
  const _isNot = (value: unknown) => (o: object) => !is(value, result(o));
  const _isNotW = (value: unknown) => _isNot(value);
  const _gt = (value: unknown) => (o: object) =>
    (result(o) as number) > (value as number);
  const _gtW = (value: unknown) => _gt(value);
  const _gte = (value: unknown) => (o: object) =>
    (result(o) as number) >= (value as number);
  const _gteW = (value: unknown) => _gte(value);
  const _lt = (value: unknown) => (o: object) =>
    (result(o) as number) < (value as number);
  const _ltW = (value: unknown) => _lt(value);
  const _lte = (value: unknown) => (o: object) =>
    (result(o) as number) <= (value as number);
  const _lteW = (value: unknown) => _lte(value);

  const extensions = {
    satisfies: _satisfies,
    eq: _eq,
    eqW: _eqW,
    notEq: _notEq,
    notEqW: _notEqW,
    looselyEq: _looselyEq,
    looselyEqW: _looselyEqW,
    notLooselyEq: _notLooselyEq,
    notLooselyEqW: _notLooselyEqW,
    equals: _equals,
    equalsW: _equalsW,
    is: _is,
    isW: _isW,
    isNot: _isNot,
    isNotW: _isNotW,
    notEquals: _notEquals,
    notEqualsW: _notEqualsW,
    gt: _gt,
    gtW: _gtW,
    gte: _gte,
    gteW: _gteW,
    lt: _lt,
    ltW: _ltW,
    lte: _lte,
    lteW: _lteW,
  };

  return Object.assign(result, { ...extensions, [zTag]: 'Path' }) as Path<O, P>;
};

export default path;
