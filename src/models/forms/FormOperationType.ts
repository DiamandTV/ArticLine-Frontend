import { JSX } from "react"

export type FormOperationType = 'Create' | 'Update'

export interface FormOperationWrapperProps<T>{
    operation:FormOperationType,
    children:(params:T)=>React.ReactElement<T>,
}

export type FormOperationInterface<T> = Record<FormOperationType,(props:T)=>JSX.Element>