import { FieldValues, UseFormProps } from "react-hook-form";

export interface FieldsProviderProps<T extends FieldValues> extends UseFormProps<T>{
    children:React.ReactNode
} 