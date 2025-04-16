import { GenericFieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps"
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js"
import { FieldValues, FormProvider, useForm } from "react-hook-form"

export function FieldsProvider<T extends FieldValues>(props:GenericFieldsProviderProps<T>){
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