import { JSX } from "react"

export type FormOperationType = 'Create' | 'Update' | 'Delete'

export interface FormOperationWrapperProps<T> {
    operation:FormOperationType,
    children:(params:T&React.HTMLAttributes<HTMLElement>)=>React.ReactElement<T&React.HTMLAttributes<HTMLElement>>,
}

export type FormOperationInterface<T> = Record<FormOperationType,(props:T)=>JSX.Element>