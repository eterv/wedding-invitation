export type LiteralUnion<T extends U, U = string> =
  | T
  | (U & Record<never, never>);

export type Union<
  T extends ReadonlyArray<V> | Record<string, V>,
  V = unknown,
> = T extends ReadonlyArray<V> ? T[number] : T[keyof T];
