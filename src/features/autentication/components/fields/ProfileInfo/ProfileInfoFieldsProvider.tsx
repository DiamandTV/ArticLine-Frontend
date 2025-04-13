import { FieldsProviderProps } from "@features/autentication/models/FieldsProviderProps/FieldsProviderProps"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, FormProvider, useForm } from "react-hook-form"
import {  ZodSchema } from "zod"

interface ProfileInfoFieldsProviderProps<T extends FieldValues> extends FieldsProviderProps<T>{
    schema:ZodSchema<T>
}

export function ProfileInfoFieldsProvider<T extends FieldValues>(props:ProfileInfoFieldsProviderProps<T>){
    const context = useForm<T>({
        ...props,
        resolver:zodResolver(props.schema)
    })
    return (
        <FormProvider {...context}>
            {props.children}
        </FormProvider>
    )
}