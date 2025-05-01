import { Button, Spinner } from "react-bootstrap";
import { PasswordResetRequestFields, PasswordResetRequestFieldsProvider } from "../../../fields/PasswordReset/PasswordResetRequest/PasswordResetRequest";
import { passwordResetServices } from "@features/autentication/services/passwordResetServices";
import { useFormContext } from "react-hook-form";
import { passwordResetRequestFieldsSchema, PasswordResetRequestFieldsType } from "@features/autentication/models/PasswordResetRequestFields/PasswordResetRequestFields";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { decodeServerPayloadMsg } from "@utils/serverErrorDecode/errorDecode";
import { PasswordResetRequestResponseMapStatusType, PasswordResetRequestResponseStatus, PasswordResetRequestResponseType } from "@features/autentication/models/PasswordResetResponse/PasswordResetRequestResponse";
import { toast } from "react-toastify";
import { AlertCard } from "@components/cards/AlertCard/AlertCard";
import { useMutation } from "react-query";

export function PasswordResetRequestForm(){
    return(
        <div className="w-full flex flex-col md:flex-row md gap-2">
            <PasswordResetRequestFieldsProvider>
                <PasswordResetRequestFields/>
                <PasswordResetRequestFormButton/>
            </PasswordResetRequestFieldsProvider>
        </div>
    )
}

function PasswordResetRequestFormButton(){
    const navigator = useNavigate()
    const {trigger,getValues} = useFormContext<PasswordResetRequestFieldsType>()

    const {isLoading,mutateAsync} = useMutation({
        mutationKey:['request-password-reset'],
        mutationFn:async(email:string)=>{
            return await passwordResetServices.passwordResetRequest(email)
        },
        onSuccess:()=>{
            navigator('/password/reset-sended/status/',{state:{passwordResetRequestSended:true},/*replace:true*/})            
        },
        onError:(error)=>{
            if(error instanceof AxiosError){
                const messages = decodeServerPayloadMsg(error)
                if(messages.length > 0 && Object.keys(PasswordResetRequestResponseMapStatusType).includes(messages[0])){
                    const message = messages[0] as PasswordResetRequestResponseType
                    switch(PasswordResetRequestResponseMapStatusType[message]){
                        case PasswordResetRequestResponseStatus.ERROR:
                            navigator('/password/reset-sended/status/',{state:{passwordResetRequestSended:false},replace:true}) 
                            return
                        case PasswordResetRequestResponseStatus.RECENT_RESET_REQUEST:
                            toast(
                                <AlertCard
                                  variant="warning"
                                  title="🔐 Password reset already requested"
                                  message="You've already requested a password reset recently. For security reasons, you can request a new one in a few minutes. Please be patient 🙏"
                                />,
                                {
                                    className:"w-full",
                                    hideProgressBar: true,
                                    position:'top-center'
                                }
                              )   
                            return     
                        default:
                            
                    }
                }
                navigator('/password/reset-sended/status/',{state:{passwordResetRequestSended:false},replace:true}) 
                return
            }
        },
    })

    const onClick = async(/*event:React.MouseEvent*/)=>{
        const isNotErrors = await trigger(passwordResetRequestFieldsSchema.keyof().options,{shouldFocus:true})
        if(isNotErrors){
            const email = getValues('email')
            await mutateAsync(email)
        }
    }   
    return(
        <Button className="md:px-10 max-h-14" onClick={onClick}>
            {
                isLoading ? <Spinner/> : "CONTINUE"
            }
        </Button>
    )
}