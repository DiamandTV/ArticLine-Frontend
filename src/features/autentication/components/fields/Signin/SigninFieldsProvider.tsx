import { signinFieldsSchema, SigninFieldsType } from "@features/autentication/models/SigninFields/SigninFieldsType"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"

interface SigninFieldsProviderProps  extends UseFormProps<SigninFieldsType>{
    children:React.ReactNode
}

export function SigninFieldsProvider(props:SigninFieldsProviderProps){
    const control = useForm<SigninFieldsType>({
        ...props,
        resolver:zodResolver(signinFieldsSchema)
    })
    return(
        <FormProvider {...control}>
            {props.children}
        </FormProvider>
    )
}