import { addressInfoFieldsSchema, AddressInfoFieldsType } from "@features/autentication/models/AddressInfoFields/AddressInfoFieldsType";
import { FieldsProviderProps } from "@features/autentication/models/FieldsProviderProps/FieldsProviderProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

export function AddressInfoFieldsProvider(props:FieldsProviderProps<AddressInfoFieldsType>){
    const control = useForm<AddressInfoFieldsType>({
        ...props,
        resolver:zodResolver(addressInfoFieldsSchema)
    })
    return(
        <FormProvider {...control}>
            {props.children}
        </FormProvider>
    )
}