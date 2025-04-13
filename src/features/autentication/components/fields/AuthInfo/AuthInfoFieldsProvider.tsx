import { authInfoFieldsSchema, AuthInfoFieldsType } from "@features/autentication/models/AuthInfoFields/AuthInfoFieldsType";
import { FieldsProviderProps } from "@features/autentication/models/FieldsProviderProps/FieldsProviderProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, } from "react-hook-form";


export function AuthInfoFieldsProvider(props:FieldsProviderProps<AuthInfoFieldsType>){
    const control = useForm<AuthInfoFieldsType>({
        ...props,
        resolver:zodResolver(authInfoFieldsSchema)
    })
    return(
        <FormProvider {...control}>
            {props.children}
        </FormProvider>
    )
}