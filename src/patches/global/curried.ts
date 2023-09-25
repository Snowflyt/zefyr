import curried from '../../global/curried';
import { patch } from '../../internal/utils/patch';

declare global {
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
  function curried<A, R>(fn: (a: A) => R): (a: A) => R;
  function curried<A, B, R>(fn: (a: A, b: B) => R): (a: A) => (b: B) => R;
  function curried<A, B, C, R>(
    fn: (a: A, b: B, c: C) => R,
  ): (a: A) => (b: B) => (c: C) => R;
  function curried<A, B, C, D, R>(
    fn: (a: A, b: B, c: C, d: D) => R,
  ): (a: A) => (b: B) => (c: C) => (d: D) => R;
  function curried<A, B, C, D, E, R>(
    fn: (a: A, b: B, c: C, d: D, e: E) => R,
  ): (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => R;
  function curried<A, B, C, D, E, F, R>(
    fn: (a: A, b: B, c: C, d: D, e: E, f: F) => R,
  ): (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => R;
  function curried<A, B, C, D, E, F, G, R>(
    fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => R,
  ): (a: A) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => R;
  function curried<A, B, C, D, E, F, G, H, R>(
    fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => R,
  ): (
    a: A,
  ) => (b: B) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => R;
  function curried<A, B, C, D, E, F, G, H, I, R>(
    fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => R,
  ): (
    a: A,
  ) => (
    b: B,
  ) => (c: C) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => R;
  function curried<A, B, C, D, E, F, G, H, I, J, R>(
    fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => R,
  ): (
    a: A,
  ) => (
    b: B,
  ) => (
    c: C,
  ) => (d: D) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => (j: J) => R;
  function curried<A, B, C, D, E, F, G, H, I, J, K, R>(
    fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K) => R,
  ): (
    a: A,
  ) => (
    b: B,
  ) => (
    c: C,
  ) => (
    d: D,
  ) => (e: E) => (f: F) => (g: G) => (h: H) => (i: I) => (j: J) => (k: K) => R;
  function curried<A, B, C, D, E, F, G, H, I, J, K, L, R>(
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
  ) => (f: F) => (g: G) => (h: H) => (i: I) => (j: J) => (k: K) => (l: L) => R;
  function curried<A, B, C, D, E, F, G, H, I, J, K, L, M, R>(
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
  ) => (g: G) => (h: H) => (i: I) => (j: J) => (k: K) => (l: L) => (m: M) => R;
  function curried<A, B, C, D, E, F, G, H, I, J, K, L, M, N, R>(
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
  ) => (h: H) => (i: I) => (j: J) => (k: K) => (l: L) => (m: M) => (n: N) => R;
  function curried<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, R>(
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
  ) => (
    g: G,
  ) => (
    h: H,
  ) => (i: I) => (j: J) => (k: K) => (l: L) => (m: M) => (n: N) => (o: O) => R;
  function curried<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, R>(
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
  ) => (
    h: H,
  ) => (
    i: I,
  ) => (j: J) => (k: K) => (l: L) => (m: M) => (n: N) => (o: O) => (p: P) => R;
  function curried<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>(
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
  ) => (
    i: I,
  ) => (
    j: J,
  ) => (k: K) => (l: L) => (m: M) => (n: N) => (o: O) => (p: P) => (q: Q) => R;
  function curried(
    fn: (...args: unknown[]) => unknown,
  ): (...args: unknown[]) => unknown;
}

patch(globalThis).withStatic({ curried });
