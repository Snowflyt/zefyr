/**
 * Returns a curried version of the provided function.
 * @param fn The function to curry.
 *
 * @example
 * ```typescript
 * const add = (a: number, b: number) => a + b;
 * const curriedAdd = curried(add);
 * const add2 = curriedAdd(2);
 * add2(3); // => 5
 * ```
 */
const curried: {
  <A, R>(fn: (a: A) => R): (a: A) => R;
  <A, B, R>(fn: (a: A, b: B) => R): (a: A) => (b: B) => R;
  <A, B, C, R>(fn: (a: A, b: B, c: C) => R): (a: A) => (b: B) => (c: C) => R;
  <A, B, C, D, R>(fn: (a: A, b: B, c: C, d: D) => R): (a: A) => (b: B) => (c: C) => (d: D) => R;
  <A, B, C, D, E, R>(fn: (a: A, b: B, c: C, d: D, e: E) => R): (
    a: A,
  ) => (b: B) => (c: C) => (d: D) => (e: E) => R;
  <A, B, C, D, E, F, R>(fn: (a: A, b: B, c: C, d: D, e: E, f: F) => R): (
    a: A,
  ) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => R;
  <A, B, C, D, E, F, G, R>(fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => R): (
    a: A,
  ) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => R;
  <A, B, C, D, E, F, G, H, R>(fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => R): (
    a: A,
  ) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => R;
  <A, B, C, D, E, F, G, H, I, R>(fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => R): (
    a: A,
  ) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => R;
  <A, B, C, D, E, F, G, H, I, J, R>(
    fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => R,
  ): (
    a: A,
  ) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => (j: J) => R;
  <A, B, C, D, E, F, G, H, I, J, K, R>(
    fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K) => R,
  ): (
    a: A,
  ) => (
    b: B,
  ) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => (j: J) => (k: K) => R;
  <A, B, C, D, E, F, G, H, I, J, K, L, R>(
    fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L) => R,
  ): (
    a: A,
  ) => (
    b: B,
  ) => (
    c: C,
  ) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => (j: J) => (k: K) => (l: L) => R;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, R>(
    fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M) => R,
  ): (
    a: A,
  ) => (
    b: B,
  ) => (
    c: C,
  ) => (
    d: D,
  ) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => (j: J) => (k: K) => (l: L) => (m: M) => R;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N, R>(
    fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K, l: L, m: M, n: N) => R,
  ): (
    a: A,
  ) => (
    b: B,
  ) => (
    c: C,
  ) => (
    d: D,
  ) => (
    e: E,
  ) => (f: F) => (g: G) => (h: H) => (i: I) => (j: J) => (k: K) => (l: L) => (m: M) => (n: N) => R;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, R>(
    fn: (
      a: A,
      b: B,
      c: C,
      d: D,
      e: E,
      f: F,
      g: G,
      h: H,
      i: I,
      j: J,
      k: K,
      l: L,
      m: M,
      n: N,
      o: O,
    ) => R,
  ): (
    a: A,
  ) => (
    b: B,
  ) => (
    c: C,
  ) => (
    d: D,
  ) => (
    e: E,
  ) => (
    f: F,
  ) => (g: G) => (h: H) => (i: I) => (j: J) => (k: K) => (l: L) => (m: M) => (n: N) => (o: O) => R;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, R>(
    fn: (
      a: A,
      b: B,
      c: C,
      d: D,
      e: E,
      f: F,
      g: G,
      h: H,
      i: I,
      j: J,
      k: K,
      l: L,
      m: M,
      n: N,
      o: O,
      p: P,
    ) => R,
  ): (
    a: A,
  ) => (
    b: B,
  ) => (
    c: C,
  ) => (
    d: D,
  ) => (
    e: E,
  ) => (
    f: F,
  ) => (
    g: G,
  ) => (h: H) => (i: I) => (j: J) => (k: K) => (l: L) => (m: M) => (n: N) => (o: O) => (p: P) => R;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
    fn: (
      a: A,
      b: B,
      c: C,
      d: D,
      e: E,
      f: F,
      g: G,
      h: H,
      i: I,
      j: J,
      k: K,
      l: L,
      m: M,
      n: N,
      o: O,
      p: P,
      q: Q,
    ) => R,
  ): (
    a: A,
  ) => (
    b: B,
  ) => (
    c: C,
  ) => (
    d: D,
  ) => (
    e: E,
  ) => (
    f: F,
  ) => (
    g: G,
  ) => (
    h: H,
  ) => (i: I) => (j: J) => (k: K) => (l: L) => (m: M) => (n: N) => (o: O) => (p: P) => (q: Q) => R;
  (fn: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} = (fn: (...args: unknown[]) => any) => {
  const curriedFn = (...args: unknown[]) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...args2: unknown[]) => curriedFn(...args, ...args2);
  };
  return curriedFn;
};

export default curried;
