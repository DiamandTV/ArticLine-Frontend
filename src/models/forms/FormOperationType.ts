import { JSX } from "react"

export type FormOperationType = 'Create' | 'Update'

export type FormOperationInterface = Record<FormOperationType,()=>JSX.Element>