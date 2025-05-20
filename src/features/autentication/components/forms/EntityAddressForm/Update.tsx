import { Button, Spinner } from "react-bootstrap";
import { EntityAddressInfoFields, EntityAddressInfoFieldsProvider } from "../../fields/EntityAddress/EntityAddressInfoFields";
import { useFormContext } from "react-hook-form";
import { entityAddressInfoFieldsSchema, EntityAddressInfoFieldsType } from "@features/autentication/models/EntityAddress/Field/EntityAddressFields";
import { useMutation } from "react-query";
import { entityAddressCacheKey } from "@features/autentication/data/query";
import { useEntityAddressContext } from "@features/autentication/context/EntityAddressContext/EntityAddressProvider";
import { entityAddressService } from "@features/autentication/services/entityAddressService";
import { setServerValidationErrors } from "@utils/serverErrorDecode/errorDecode";
import { AxiosError } from "axios";
import { entityAddressToFields } from "@features/autentication/utils/formTransformers/entityAddress/entityAddressTransformers";

export function Update(){
    const {entityAddress} = useEntityAddressContext()
    return (
        <EntityAddressInfoFieldsProvider defaultValues={entityAddressToFields(entityAddress)}>
            <div className="w-full h-full flex flex-col gap-2">
                <EntityAddressInfoFields/>
                <UpdateButton/>
            </div>
        </EntityAddressInfoFieldsProvider>
    )
}

function UpdateButton(){
    const { entityAddress } = useEntityAddressContext()
    const {trigger,getValues,setError,formState:{isDirty}} = useFormContext<EntityAddressInfoFieldsType>()
    const {isLoading,mutateAsync} = useMutation({
        mutationKey:[entityAddressCacheKey.update],
        mutationFn:async(entityAddressInfo:EntityAddressInfoFieldsType)=>await entityAddressService.update(entityAddress.id,entityAddressInfo),
        onSuccess:(data)=>{
            console.log(data)
        },
        onError:(error)=>{
            console.log(error)
            if(error instanceof AxiosError){
                // todo: handle custom errors
                setServerValidationErrors(error,setError,entityAddressInfoFieldsSchema.keyof().options)
            }
        }
    })
    
    const onClick = async()=>{
        const isNotErrors = await trigger()
        if(isNotErrors){
            const entityAddressInfo = getValues()
            await mutateAsync(entityAddressInfo)
        }
    }

    return(
        <Button className="w-full font-medium text-sm" disabled={isLoading || !isDirty} onClick={onClick}>
            {isLoading ? <Spinner/> : <span>SAVE</span>}
        </Button>
    )
}