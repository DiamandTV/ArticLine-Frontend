import { Button, Spinner } from "react-bootstrap";
import { PasswordResetFields, PasswordResetFieldsProvider } from "../../../fields/PasswordReset/PasswordResetNew/PasswordResetFields";
import { useMutation } from "react-query";
import { basePasswordResetFieldsSchema, PasswordResetFieldsType } from "@features/autentication/models/PasswordReset/PasswordResetFields";
import { passwordResetServices } from "@features/autentication/services/passwordResetServices";
import { useNavigate, useParams } from "react-router";
import { useFormContext } from "react-hook-form";
import { PasswordResetResponseMapStatusType, PasswordResetResponseStatus, PasswordResetResponseType } from "@features/autentication/models/PasswordResetResponse/PasswordResetResponse";
import { AxiosError } from "axios";
import { decodeServerPayloadMsg, setServerValidationErrors } from "@utils/serverErrorDecode/errorDecode";

export function PasswordResetForm(){
    return(
        <div className="w-full flex flex-col md:flex-row gap-2">
            <PasswordResetFieldsProvider>
                <PasswordResetFields/>
                <PasswordResetFormButton/>
            </PasswordResetFieldsProvider>
        </div>
    )
}

function PasswordResetFormButton(){
    const params = useParams()
    const navigator = useNavigate()
    const {trigger,getValues,setError} = useFormContext<PasswordResetFieldsType>()
    const {isLoading,mutateAsync} = useMutation({
        mutationKey:['password-reset'],
        mutationFn:async({token,params}:{token:string|undefined,params:PasswordResetFieldsType})=>{
            return await passwordResetServices.passwordReset(token,params)
        },
        onSuccess:()=>{
            navigator('/password/reset/status/',{state:{status:PasswordResetResponseStatus.PASSWORD_CHANGED},/*replace:true*/})
        },
        onError:(error)=>{
            if(error instanceof AxiosError){
                const messages = decodeServerPayloadMsg(error)
                if(messages.length > 0 && Object.keys(PasswordResetResponseMapStatusType).includes(messages[0])){
                    const message = messages[0] as PasswordResetResponseType
                    const status = PasswordResetResponseMapStatusType[message]
                    navigator('/password/reset/status/',{state:{status},/*replace:true*/})
                    return
                }

                setServerValidationErrors(error,setError,basePasswordResetFieldsSchema.keyof().options)
                
            }
        }
    })
    const onClick = async()=>{
        const isNotErrors = await trigger(basePasswordResetFieldsSchema.keyof().options,{shouldFocus:true})
        if(isNotErrors){
            const token = params['token']
            const fieldsParams = getValues()
            await mutateAsync({token,params:fieldsParams})
        }
    }
    return(
        <Button className="md:px-10" onClick={onClick}>
            {
                isLoading ? <Spinner/> : 'CHANGE'
            }
        </Button>
    )
}