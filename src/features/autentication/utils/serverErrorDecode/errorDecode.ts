import { ServerErrorResponseInterface } from "@models/ApiResponse/ErrorResponse/ServerErrorResponseInterface";
import { AxiosError } from "axios";
import { FieldValues, UseFormSetError, Path } from "react-hook-form";

export function decodeServerPayloadMsg(axiosError:AxiosError):Array<string>{
    const data = axiosError?.response?.data
    if(data && typeof data === 'object' && "errors" in data && Array.isArray(data.errors)){
        const errors = data.errors as Array<ServerErrorResponseInterface> | undefined
        if(errors && errors.length > 0){
            return errors.map((error)=>{
                const messageWithPayload = error.code
                const message = (messageWithPayload as string).replace(/^.*]-/,'')
                return message
            })
        }
    }
    return []
}

export function setServerValidationErrors<T extends FieldValues>(axiosError:AxiosError,setError:UseFormSetError<T>,keys:Array<Path<T>>){
    const data = axiosError?.response?.data
    if(data && typeof data === 'object' && "errors" in data && Array.isArray(data.errors)){
        const errors = data.errors as Array<ServerErrorResponseInterface> | undefined
        if(errors && errors.length > 0){
            errors.forEach((error)=>{
                const attr = error.attr as Path<T>
                if(keys.includes(attr)){
                    setError(attr,{message:error.detail,type:"custom"})
                }
            })   
        }
    }
}

// GET INDEX ERROR RESPONSE FROM THE SERVER PAYLOAD MSG
export function get_IER_from_SPM(axiosError:AxiosError,index:number):ServerErrorResponseInterface|null{
    const data = axiosError?.response?.data
    if(data && typeof data === 'object' && "errors" in data && Array.isArray(data.errors)){
        const errors = data.errors as Array<ServerErrorResponseInterface> | undefined
        if(errors && errors?.length > index){
            return errors[index]
        }       
    }
    return null
}