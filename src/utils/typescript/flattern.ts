import { ProductInterface } from "@features/store/model/Product/Interface/ProductInterface";
import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface";

type _Flattern<T,Prefix extends string = ''> = {
    [K in keyof T]:T[K] extends object ? _Flattern<T[K],`${Prefix}${K & string}.`> : {
        [P in `${Prefix}${K & string}`]:T[K]
    }
}[keyof T] extends infer O 
?   { [K in keyof O]:ToRecord<O[K]> } : never

type ToRecord<U> = (U extends any ? (x: U)=>void : never) extends ((x: infer I)=>void) ? I : never

export type Flattern = Extract<_Flattern<ProductInterface>,object>


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FlatternOverUnions<T> = T extends any ? Flattern<T> : never;