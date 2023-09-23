import { zTag } from '../.internal/zTag';

import equals from './equals';
import is from './is';

type PropExtension<P extends PropertyKey> = <T>(
  value: P extends keyof T ? T[P] : never,
) => (o: T) => boolean;
type PropExtensionW<P extends PropertyKey> = <T>(
  value: P extends keyof T ? unknown : never,
) => (o: T) => boolean;

type PropExtensions<P extends PropertyKey> = {
  /**
   * Returns `true` if the value of the property satisfies the predicate.
   * @param pred The predicate to satisfy.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').satisfies((value) => value === 1)); // => [{ a: 1, b: 2 }]
   * ```
   */
  satisfies: <O extends object>(
    pred: P extends keyof O ? (value: O[P]) => boolean : never,
  ) => (o: O) => boolean;
  /**
   * Returns `true` if the value of the property is equal to the specified value (using `===`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').eq(1)); // => [{ a: 1, b: 2 }]
   * ```
   */
  eq: PropExtension<P>;
  /**
   * Returns `true` if the value of the property is equal to the specified value (using `===`).
   *
   * It is the same as `eq` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').eqW(1)); // => [{ a: 1, b: 2 }]
   * ```
   */
  eqW: PropExtensionW<P>;
  /**
   * Returns `true` if the value of the property is not equal to the specified value (using `!==`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').notEq(1)); // => [{ a: 3, b: 4 }]
   * ```
   */
  notEq: PropExtension<P>;
  /**
   * Returns `true` if the value of the property is not equal to the specified value (using `!==`).
   *
   * It is the same as `notEq` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').notEqW(1)); // => [{ a: 3, b: 4 }]
   * ```
   */
  notEqW: PropExtensionW<P>;
  /**
   * Returns `true` if the value of the property is loosely equal to the specified value (using `==`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: '1', b: 4 }];
   * objs.filter(prop('a').looselyEq(1)); // => [{ a: 1, b: 2 }, { a: '1', b: 4 }]
   * ```
   */
  looselyEq: PropExtension<P>;
  /**
   * Returns `true` if the value of the property is loosely equal to the specified value (using `==`).
   *
   * It is the same as `looselyEq` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: '1', b: 4 }];
   * objs.filter(prop('a').looselyEqW(1)); // => [{ a: 1, b: 2 }, { a: '1', b: 4 }]
   * ```
   */
  looselyEqW: PropExtensionW<P>;
  /**
   * Returns `true` if the value of the property is not loosely equal to the specified value (using `!=`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: '1', b: 4 }];
   * objs.filter(prop('a').notLooselyEq(1)); // => []
   * ```
   */
  notLooselyEq: PropExtension<P>;
  /**
   * Returns `true` if the value of the property is not loosely equal to the specified value (using `!=`).
   *
   * It is the same as `notLooselyEq` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: '1', b: 4 }];
   * objs.filter(prop('a').notLooselyEqW(1)); // => []
   * ```
   */
  notLooselyEqW: PropExtensionW<P>;
  /**
   * Returns `true` if the value of the property is equal to the specified value (using `equals`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: 1 }, c: 2 }, { a: { b: 3 }, c: 4 }];
   * objs.filter(prop('a').equals({ b: 1 })); // => [{ a: { b: 1 }, c: 2 }]
   * ```
   *
   * @see {@link equals}
   */
  equals: PropExtension<P>;
  /**
   * Returns `true` if the value of the property is equal to the specified value (using `equals`).
   *
   * It is the same as `equals` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: 1 }, c: 2 }, { a: { b: 3 }, c: 4 }];
   * objs.filter(prop('a').equalsW({ b: 1 })); // => [{ a: { b: 1 }, c: 2 }]
   * ```
   *
   * @see {@link equals}
   */
  equalsW: PropExtensionW<P>;
  /**
   * Returns `true` if the value of the property is not equal to the specified value (using `equals`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: 1 }, c: 2 }, { a: { b: 3 }, c: 4 }];
   * objs.filter(prop('a').notEquals({ b: 1 })); // => [{ a: { b: 3 }, c: 4 }]
   * ```
   *
   * @see {@link equals}
   */
  notEquals: PropExtension<P>;
  /**
   * Returns `true` if the value of the property is not equal to the specified value (using `equals`).
   *
   * It is the same as `notEquals` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: { b: 1 }, c: 2 }, { a: { b: 3 }, c: 4 }];
   * objs.filter(prop('a').notEqualsW({ b: 1 })); // => [{ a: { b: 3 }, c: 4 }]
   * ```
   *
   * @see {@link equals}
   */
  notEqualsW: PropExtensionW<P>;
  /**
   * Returns `true` if the value of the property is the same as the specified value (using `is`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 0, c: 2 }, { a: -0, c: 4 }];
   * objs.filter(prop('a').is(-0)); // => [{ a: -0, c: 4 }]
   * ```
   *
   * @see {@link is}
   */
  is: PropExtension<P>;
  /**
   * Returns `true` if the value of the property is the same as the specified value (using `is`).
   *
   * It is the same as `is` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 0, c: 2 }, { a: -0, c: 4 }];
   * objs.filter(prop('a').isW(-0)); // => [{ a: -0, c: 4 }]
   * ```
   *
   * @see {@link is}
   */
  isW: PropExtensionW<P>;
  /**
   * Returns `true` if the value of the property is not the same as the specified value (using `is`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 0, c: 2 }, { a: -0, c: 4 }];
   * objs.filter(prop('a').isNot(-0)); // => [{ a: 0, c: 2 }]
   * ```
   *
   * @see {@link is}
   */
  isNot: PropExtension<P>;
  /**
   * Returns `true` if the value of the property is not the same as the specified value (using `is`).
   *
   * It is the same as `isNot` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 0, c: 2 }, { a: -0, c: 4 }];
   * objs.filter(prop('a').isNotW(-0)); // => [{ a: 0, c: 2 }]
   * ```
   *
   * @see {@link is}
   */
  isNotW: PropExtensionW<P>;
  /**
   * Returns `true` if the value of the property is greater than the specified value (using `>`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').gt(1)); // => [{ a: 3, b: 4 }]
   * ```
   */
  gt: PropExtension<P>;
  /**
   * Returns `true` if the value of the property is greater than the specified value (using `>`).
   *
   * It is the same as `gt` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').gtW(1)); // => [{ a: 3, b: 4 }]
   * ```
   */
  gtW: PropExtensionW<P>;
  /**
   * Returns `true` if the value of the property is greater than or equal to the specified value (using `>=`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').gte(1)); // => [{ a: 1, b: 2 }, { a: 3, b: 4 }]
   * ```
   */
  gte: PropExtension<P>;
  /**
   * Returns `true` if the value of the property is greater than or equal to the specified value (using `>=`).
   *
   * It is the same as `gte` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').gteW(1)); // => [{ a: 1, b: 2 }, { a: 3, b: 4 }]
   * ```
   */
  gteW: PropExtensionW<P>;
  /**
   * Returns `true` if the value of the property is less than the specified value (using `<`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').lt(3)); // => [{ a: 1, b: 2 }]
   * ```
   */
  lt: PropExtension<P>;
  /**
   * Returns `true` if the value of the property is less than the specified value (using `<`).
   *
   * It is the same as `lt` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').ltW(3)); // => [{ a: 1, b: 2 }]
   * ```
   */
  ltW: PropExtensionW<P>;
  /**
   * Returns `true` if the value of the property is less than or equal to the specified value (using `<=`).
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').lte(3)); // => [{ a: 1, b: 2 }, { a: 3, b: 4 }]
   * ```
   */
  lte: PropExtension<P>;
  /**
   * Returns `true` if the value of the property is less than or equal to the specified value (using `<=`).
   *
   * It is the same as `lte` but the value is not checked at compile time.
   * The `W` postfix stands for "wide".
   * @param value The value to compare to.
   *
   * @example
   * ```typescript
   * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
   * objs.filter(prop('a').lteW(3)); // => [{ a: 1, b: 2 }, { a: 3, b: 4 }]
   * ```
   */
  lteW: PropExtensionW<P>;
};

/**
 * Returns a function that when given an object returns the value of the specified property.
 *
 * The function also has a number of extensions that can be used to compare the value of the property.
 * @param prop The property to get.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2 };
 * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
 * objs.map(prop('a')); // => [1, 3]
 * prop<typeof obj, 'a'>('a')(obj); // => 1
 * ```
 *
 * @example
 * ```typescript
 * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
 * objs.filter(prop('a').eq(1)); // => [{ a: 1, b: 2 }]
 * ```
 */
export type Prop<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P extends unknown extends T ? PropertyKey : keyof T = any,
> = ((o: T) => P extends keyof T ? T[P] : undefined) &
  PropExtensions<P> & {
    [zTag]: 'Prop';
  };

/**
 * Returns a function that when given an object returns the value of the specified property.
 *
 * The function also has a number of extensions that can be used to compare the value of the property.
 * @param prop The property to get.
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2 };
 * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
 * objs.map(prop('a')); // => [1, 3]
 * prop<typeof obj, 'a'>('a')(obj); // => 1
 * ```
 *
 * @example
 * ```typescript
 * const objs = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
 * objs.filter(prop('a').eq(1)); // => [{ a: 1, b: 2 }]
 * ```
 */
const prop = <const T, P extends object extends T ? PropertyKey : keyof T>(
  prop: P,
): Prop<T, P> => {
  const result = (o: object) => o[prop as keyof typeof o];

  const _satisfies = (pred: (value: unknown) => boolean) => (o: object) =>
    pred(o[prop as keyof typeof o]);
  const _eq = (value: unknown) => (o: object) =>
    value === o[prop as keyof typeof o];
  const _eqW = (value: unknown) => _eq(value);
  const _notEq = (value: unknown) => (o: object) =>
    value !== o[prop as keyof typeof o];
  const _notEqW = (value: unknown) => _notEq(value);
  const _looselyEq = (value: unknown) => (o: object) =>
    o[prop as keyof typeof o] == value;
  const _looselyEqW = (value: unknown) => _looselyEq(value);
  const _notLooselyEq = (value: unknown) => (o: object) =>
    o[prop as keyof typeof o] != value;
  const _notLooselyEqW = (value: unknown) => _notLooselyEq(value);
  const _equals = (value: unknown) => (o: object) =>
    equals(value, o[prop as keyof typeof o]);
  const _equalsW = (value: unknown) => _equals(value);
  const _notEquals = (value: unknown) => (o: object) =>
    !equals(value, o[prop as keyof typeof o]);
  const _notEqualsW = (value: unknown) => _notEquals(value);
  const _is = (value: unknown) => (o: object) =>
    is(value, o[prop as keyof typeof o]);
  const _isW = (value: unknown) => _is(value);
  const _isNot = (value: unknown) => (o: object) =>
    !is(value, o[prop as keyof typeof o]);
  const _isNotW = (value: unknown) => _isNot(value);
  const _gt = (value: unknown) => (o: object) =>
    (o[prop as keyof typeof o] as number) > (value as number);
  const _gtW = (value: unknown) => _gt(value);
  const _gte = (value: unknown) => (o: object) =>
    (o[prop as keyof typeof o] as number) >= (value as number);
  const _gteW = (value: unknown) => _gte(value);
  const _lt = (value: unknown) => (o: object) =>
    (o[prop as keyof typeof o] as number) < (value as number);
  const _ltW = (value: unknown) => _lt(value);
  const _lte = (value: unknown) => (o: object) =>
    (o[prop as keyof typeof o] as number) <= (value as number);
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
    notEquals: _notEquals,
    notEqualsW: _notEqualsW,
    is: _is,
    isW: _isW,
    isNot: _isNot,
    isNotW: _isNotW,
    gt: _gt,
    gtW: _gtW,
    gte: _gte,
    gteW: _gteW,
    lt: _lt,
    ltW: _ltW,
    lte: _lte,
    lteW: _lteW,
  };

  return Object.assign(result, { ...extensions, [zTag]: 'Prop' }) as Prop<T, P>;
};

export default prop;
