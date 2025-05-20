import { EntityAddressProvider } from "@features/autentication/context/EntityAddressContext/EntityAddressProvider";
import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { useGetEntityAddressSavedListQuery } from "@features/autentication/hooks/useGetEntityAddressSavedListQuery/useGetEntityAddressSavedListQuery";
import { EntityAddressDefaultFields } from "@features/autentication/models/EntityAddress/Field/EntityAddressDefault";
import { entityAddressInfoFieldsSchema } from "@features/autentication/models/EntityAddress/Field/EntityAddressFields";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { EntityAddressCard } from "../../cards/EntityAddressCard/EntityAddressCard";

export function EntityAddressDefaultFieldsProvider(props:FieldsProviderProps<EntityAddressDefaultFields>){
    return(
        <FieldsProvider<EntityAddressDefaultFields>
            {...props}
            schema={entityAddressInfoFieldsSchema}
        >
            {props.children}
        </FieldsProvider>
    )
}

export function EntityAddressChooseDefaultFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex flex-col items-center justify-center gap-2",props.className)
    const {watch,setValue} = useFormContext<EntityAddressDefaultFields>()
    const {data,isSuccess,isLoading,ref} = useGetEntityAddressSavedListQuery()
    if(isLoading || !isSuccess) return null
    return(
        <Form
            {...props}
            className={className}
            >
            <div className="w-full h-full flex flex-col gap-2">
                {data.length > 0 ? data.map((entityAddress,index)=>{
                    //const selectedClassName = "outline-none ring-4 ring-blue-250 border-blue-00 border border-gray-300 rounded transition duration-200"
                    const selectedCardClassName = "ring-2 ring-blue-500 border-blue-500 transition-colors shadow-md bg-blue-50 shadow-sm transition-colors"
                    
                    return(
                        <EntityAddressProvider entityAddress={entityAddress}>
                            
                            <EntityAddressCard
                                onClick={()=>{
                                    console.log("OK")
                                    setValue('entity_address',entityAddress.id)
                                }}
                                className={watch('entity_address') === entityAddress.id ? selectedCardClassName : ''}
                                tabIndex={index}
                                
                            />
                            
                        </EntityAddressProvider>
                    )
                }):null}
                <div className="py-0.5 -mt-2" ref={ref}/>
            </div>
        </Form>
    
    )
}