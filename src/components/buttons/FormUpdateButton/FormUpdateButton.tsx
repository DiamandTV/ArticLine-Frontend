import { ServerErrorsAndTypeInterface } from "@models/ApiResponse/ErrorResponse/ServerErrorResponseInterface";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { UseMutationResult } from "react-query";
import { ZodSchema } from "zod";

interface FormUpdateButtonProps<T extends FieldValues> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationResult:UseMutationResult<AxiosResponse<any,any>,unknown,T,unknown>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema:ZodSchema<any>
}
export function FormUpdateButton<T extends FieldValues>({mutationResult,schema}:FormUpdateButtonProps<T>){
    const {trigger,getValues,setError,formState:{isDirty}} = useFormContext<T>()
    const onClick = async(event:React.MouseEvent)=>{
        event.stopPropagation()
        const isNotError = await trigger(undefined,{shouldFocus:true})
        if(isNotError){
            //
            const values= schema.parse(getValues())
            await mutationResult.mutateAsync(values as T)
        }
    }

    useEffect(()=>{
        const err = mutationResult.error
        if(err instanceof AxiosError){
            const errorReponse = err.response?.data as ServerErrorsAndTypeInterface
            if(errorReponse && errorReponse?.type === 'validation_error'){
                const errors = errorReponse.errors
                errors.forEach((err)=>{
                    const attr = err.attr as string                      
                    setError(attr as Path<T>,{message:err.detail,type:'custom'},{shouldFocus:true})   
                })
            }
        }
    },[mutationResult.error])

    return(
        <Button className="w-full" onClick={onClick} disabled={!isDirty}>
            {mutationResult.isLoading ? <Spinner animation="border" /> : "SAVE"}
        </Button>
    )   
}