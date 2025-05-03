import { useFormContext } from "react-hook-form";
import { StoreInfoFields, StoreInfoFieldsProvider } from "../../fields/Store/StoreFields";
import { storeInfoFieldsSchema, StoreInfoFieldsType } from "@features/store/model/Store/Fields/StoreFields";
import { Button, Spinner } from "react-bootstrap";
import { useMutation } from "react-query";
import { storeBusinessServices } from "@features/store/services/storeBusinessServices";
import { AxiosError } from "axios";
import { ServerErrorsAndTypeInterface } from "@models/ApiResponse/ErrorResponse/ServerErrorResponseInterface";

export function _Create(){
    return(
        <div className="w-full flex flex-col gap-2 ">
            <StoreInfoFieldsProvider>
                <StoreInfoFields />
                <CreateButton/>
            </StoreInfoFieldsProvider>
        </div>
    )
}

function CreateButton(){
    const {trigger,getValues,setError} = useFormContext<StoreInfoFieldsType>()
    const {isLoading,mutateAsync} = useMutation({
        mutationKey:['create-store'],
        mutationFn:async(params:StoreInfoFieldsType)=>await storeBusinessServices.create(params),
        onSuccess:(data)=>{
            // todo:send to the list of pages
            console.log(data)
        },
        onError:(err)=>{
            if(err instanceof AxiosError){
                const errorReponse = err.response?.data as ServerErrorsAndTypeInterface
                if(errorReponse && errorReponse?.type === 'validation_error'){
                    const errors = errorReponse.errors
                    errors.forEach((err)=>{
                        const attr = err.attr as string                      
                        setError(attr as keyof StoreInfoFieldsType,{message:err.detail,type:'custom'},{shouldFocus:true})   
                    })
                }
            }
        }
    })
    const onClick = async(event:React.MouseEvent)=>{
        event.stopPropagation()
        const isNotError = await trigger(storeInfoFieldsSchema.keyof().options,{shouldFocus:true})
        if(isNotError){
            //
            const values = storeInfoFieldsSchema.parse(getValues())
            console.log(values)
            await mutateAsync(values)
        }
    }
    return(
        <Button className="w-full" onClick={onClick}>
            {isLoading ? <Spinner animation="border" /> : "CREATE"}
        </Button>
    )
}