import { FieldsProviderProps } from "@features/autentication/models/FieldsProviderProps/FieldsProviderProps"
import { loginFieldsSchema, LoginFieldsType } from "@features/autentication/models/LoginFields/LoginFieldsType"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

export function LoginFieldsProvider(props:FieldsProviderProps<LoginFieldsType>){
    const control = useForm<LoginFieldsType>({
        ...props,
        resolver:zodResolver(loginFieldsSchema)
    })
    return(
        <FormProvider {...control}>
            {props.children}
        </FormProvider>
    )
}