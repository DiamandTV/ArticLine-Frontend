import { Button, Spinner } from "react-bootstrap";
import { EntityAddressInfoFields, EntityAddressInfoFieldsProvider } from "../../fields/EntityAddress/EntityAddressInfoFields";
import { useFormContext } from "react-hook-form";
import { entityAddressInfoFieldsSchema, EntityAddressInfoFieldsType } from "@features/autentication/models/EntityAddress/Field/EntityAddressFields";
import { useMutation, useQueryClient } from "react-query";
import { entityAddressCacheKey } from "@features/autentication/data/query";
import { entityAddressService } from "@features/autentication/services/entityAddressService";
import { useContext } from "react";
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";
import { AxiosError } from "axios";
import { setServerValidationErrors } from "@utils/serverErrorDecode/errorDecode";

export function Create(){
    return(
        <EntityAddressInfoFieldsProvider>
            <div className="w-full h-full flex flex-col gap-2">
                <EntityAddressInfoFields/>
                <CreateButton/>
            </div>
        </EntityAddressInfoFieldsProvider>
    )
}

function CreateButton(){
    const {setOpen} = useContext(BottomSheetModalContext)
    const {trigger,getValues,setError} = useFormContext<EntityAddressInfoFieldsType>()
    const queryClient = useQueryClient()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:[entityAddressCacheKey.create],
        mutationFn:async(entityAddressInfo:EntityAddressInfoFieldsType)=>await entityAddressService.create(entityAddressInfo),
        onSuccess:(data)=>{
            console.log(data)
            setOpen(false)

            queryClient.invalidateQueries([entityAddressCacheKey.list])
        },
        onError:(error)=>{
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
            console.log(entityAddressInfo)
            await mutateAsync(entityAddressInfo)
        } 
    }
    return(
        <Button className="w-full font-medium text-sm" onClick={onClick}>
            {
                isLoading ? <Spinner/> : <span>CREATE</span>
            }
        </Button>
    )
}