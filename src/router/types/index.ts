export type ExtractRouteNames<T> = T extends readonly (infer U)[]
  ? ExtractRouteNames<U>
  : T extends { children: infer C, name: infer N }
    ? N | ExtractRouteNames<C>
    : T extends { name: infer N }
      ? N
      : never;
