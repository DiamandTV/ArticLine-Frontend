import { InterfaceWithKind } from "@models/Permission/permission";


type Flatten<T, Prefix extends string = ''> = {
    [K in keyof T]: T[K] extends object
      ? Flatten<T[K], `${Prefix}${K & string}.`>
      : { [P in `${Prefix}${K & string}`]: T[K] }
  }[keyof T];

type UnionToIntersection<U> = 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (U extends any ? (k: U) => void : never) extends 
  (k: infer I) => void ? I : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Flattened<T> = UnionToIntersection<Flatten<T>>
export type FlattenInterfaceWithKind<T> = T extends InterfaceWithKind<infer U, infer K>
? InterfaceWithKind<Flattened<U>, K>
: never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MapUnion<T> = T extends any ? Flattened<T> : never;