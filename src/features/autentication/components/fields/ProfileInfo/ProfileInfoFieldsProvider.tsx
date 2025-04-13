import { FieldsProviderProps } from "@features/autentication/models/FieldsProviderProps/FieldsProviderProps"
import { profileInfoFieldsSchema, ProfileInfoFieldsType } from "@features/autentication/models/ProfileInfoFields/ProfileInfoFieldsType"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"



export function ProfileInfoFieldsProvider(props:FieldsProviderProps<ProfileInfoFieldsType>){
    const context = useForm<ProfileInfoFieldsType>({
        ...props,
        resolver:  zodResolver(profileInfoFieldsSchema)
    })
    return (
        <FormProvider {...context}>
            {props.children}
        </FormProvider>
    )
    
}