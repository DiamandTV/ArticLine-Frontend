import { FieldValues, UseFormProps } from "react-hook-form";
import { ZodSchema } from "zod";


export interface GenericFieldsProviderProps<T extends FieldValues> extends UseFormProps<T>{
    children:React.ReactNode,
    schema:ZodSchema<T>
} 

export type FieldsProviderProps<T extends FieldValues> = Omit<GenericFieldsProviderProps<T>,"schema"> 
