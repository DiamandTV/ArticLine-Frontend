export type WithRequiredProperty<Type,Keys extends keyof Type> = Type & {
    [Property in Keys]-?:Type[Property]
}