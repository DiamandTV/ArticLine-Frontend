import { Button, Spinner } from "react-bootstrap";
import { LoginFields, LoginFieldsProvider } from "../../fields/Login/LoginFields";
import { LoginPasswordForgotText } from "../../texts/LoginText/LoginFooterText/LoginPasswordForgotText";
import { useMutation } from "react-query";
import { loginFieldsSchema, LoginFieldsType } from "@features/autentication/models/LoginFields/LoginFieldsType";
import { loginServices } from "@features/autentication/services/loginServices";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authSliceActions } from "@features/autentication/slices/authSlice";
import { AxiosError } from "axios";
import { decodeServerPayloadMsg } from "@features/autentication/utils/serverErrorDecode/errorDecode";
import { AccountResponseMapStatusType, AccountResponseType } from "@features/autentication/models/AccountResponse/AccountResponse";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AlertCard } from "@components/cards/AlertCard/AlertCard";
import { AuthVerificationResendButton } from "../../buttons/AuthVerificationResendButton/AuthVerificationResendButton";
export function LoginForm(){
    return(
        <div className="flex flex-col gap-2 w-full">
            <LoginFieldsProvider>
                <LoginFields/>          
                <LoginFormButton/>
                <LoginPasswordForgotText/>  
            </LoginFieldsProvider>
        </div>
    )
}

function LoginFormButton(){
    const dispatch = useDispatch()

    const navigator = useNavigate()
    
    const {trigger,getValues} = useFormContext<LoginFieldsType>()
    const {isLoading,mutateAsync} = useMutation({
        mutationKey:['login'],
        mutationFn:async(params:LoginFieldsType)=>{
            return await loginServices.login(params)
        },
        onSuccess:(data)=>{
            if(data.data){
                const result = dispatch(authSliceActions.setSession(data.data))
                if(result){
                    navigator('/',{replace:true})
                }
            }
        },
        onError:(error)=>{
            if(error instanceof AxiosError){
                const messages = decodeServerPayloadMsg(error)
                if(messages.length > 0 && Object.keys(AccountResponseMapStatusType).includes(messages[0])){
                    messages.forEach((message)=>{
                        switch(message as AccountResponseType){
                            case 'NOT-VERIFIED':
                                    // show an alert to request another verification link 
                                    toast(
                                        <AlertCard
                                            variant="warning"
                                            title="⚠️ Email verification required"
                                            message="You need to verify your email before you can log in. Please check your inbox for the verification link, or request a new one if needed."
                                            action={<Button className="w-full">RESEND LINK</Button>}
                                        />,
                                        {
                                            className:"w-full",
                                            position:'top-center',
                                            hideProgressBar:true
                                        }
                                    )
                                    return
                            case 'no_active_account':
                                toast(
                                    <AlertCard
                                        variant="danger"
                                        title="🚫 Invalid credentials"
                                        message="The email or password you entered is incorrect. Please double-check your login information and try again."
                                        />,
                                    {
                                        className:"w-full",
                                        position:"top-center",
                                        hideProgressBar:true
                                    }
                                )
                                return
                        }
                    })
                } 

            }
        }
    })

    const onClick = async()=>{
        const isNotErrors = await trigger(loginFieldsSchema.keyof().options,{shouldFocus:true})
        if(isNotErrors){
            const fieldParams = getValues()
            await mutateAsync(fieldParams)
        }
    }

    return(
        <Button onClick={onClick}>
            {
                isLoading ? 
                <Spinner/> : "LOGIN"
            }
        </Button>
    )
}

 