import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { addressInfoFieldsSchema, AddressInfoFieldsType } from "@features/autentication/models/Address/AddressInfoFields/AddressInfoFieldsType";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";

export function AddressInfoFieldsProvider(props:FieldsProviderProps<AddressInfoFieldsType>){
    return (
        <FieldsProvider<AddressInfoFieldsType> {...props} schema={addressInfoFieldsSchema}>
            {props.children}
        </FieldsProvider>
    )
}