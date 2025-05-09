export type Flattern<T,Prefix extends string = ''> = {
    [K in keyof T]:T[K] extends object ? Flattern<T[K],`${Prefix}${K & string}.`> : {
        [P in `${Prefix}${K & string}`]:T[K]
    }
}[keyof T] extends infer O 
?   { [K in keyof O]:O[K] } : never

