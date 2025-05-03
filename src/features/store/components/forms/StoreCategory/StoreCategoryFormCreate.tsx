import { Button, Spinner } from "react-bootstrap";
import { StoreCategoryFields, StoreCategoryInfoFieldsProvider } from "../../fields/StoreCategory/StoreCategoryFields";
import { useFormContext } from "react-hook-form";
import {  StoreCategoryInfoFieldsType } from "@features/store/model/StoreCategory/Fields/StoreCategoryFields";
import { useMutation } from "react-query";
import { storeBusinessCategoryServices } from "@features/store/services/storeBusinessCategoryService";
import { useParams } from "react-router";
import { AxiosError } from "axios";
import { ServerErrorsAndTypeInterface } from "@models/ApiResponse/ErrorResponse/ServerErrorResponseInterface";
import { useContext } from "react";
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";

export function _Create(){
    return(
        <div className="w-full flex flex-col gap-2 ">
            <StoreCategoryInfoFieldsProvider>
                <StoreCategoryFields/>
                <CreateButton/>
            </StoreCategoryInfoFieldsProvider>
        </div>
    )
}

// todo: create a generic create button to DRY
function CreateButton(){
    const {setOpen} = useContext(BottomSheetModalContext)
    const params = useParams()
    const {trigger,getValues,setError} = useFormContext<StoreCategoryInfoFieldsType>()
    const {isLoading,mutateAsync} = useMutation({
        mutationKey:['create-store-category'],
        mutationFn:async(storeCategoryInfo:StoreCategoryInfoFieldsType)=>{
            const storeId = params['store-id']
            if(storeId){
                return await storeBusinessCategoryServices.create(Number(storeId),storeCategoryInfo)
            }
            return Promise.reject()
        },
        onError:(err)=>{
            if(err instanceof AxiosError){
                const errorReponse = err.response?.data as ServerErrorsAndTypeInterface
                if(errorReponse && errorReponse?.type === 'validation_error'){
                    const errors = errorReponse.errors
                    errors.forEach((err)=>{
                        const attr = err.attr as string                      
                        setError(attr as keyof StoreCategoryInfoFieldsType,{message:err.detail,type:'custom'},{shouldFocus:true})   
                    })
                }
            }
        },
        onSuccess:(data)=>{
            // todo: save this in the cache
            console.log(data)
            setOpen(false)
        }
    })
    const onClick = async()=>{
        const isNotError = await trigger(undefined,{shouldFocus:true})
        if(isNotError){
            const values = getValues()
            await mutateAsync(values)
        } 
    }
    return(
        <Button variant="primary" onClick={onClick}>
            {isLoading ? <Spinner animation="border"/> : "CREATE"}
        </Button>
    )
}