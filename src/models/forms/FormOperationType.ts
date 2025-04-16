import { JSX } from "react"

export type FormOperationType = 'Create' | 'Update'

export type FormOperationInterface<T> = Record<FormOperationType,(props:T)=>JSX.Element>