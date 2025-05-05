import { FieldValues, UseFormProps } from "react-hook-form";
import {  ZodSchema } from "zod";


export interface GenericFieldsProviderProps<T extends FieldValues> extends UseFormProps<T>{
    children:React.ReactNode,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema:ZodSchema<any>
} 

export type FieldsProviderProps<T extends FieldValues> = Omit<GenericFieldsProviderProps<T>,"schema"> 
