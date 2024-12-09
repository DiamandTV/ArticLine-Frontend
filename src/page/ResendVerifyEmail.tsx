import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LoaderResponse } from "../components/loader/LoaderResponse";
import { StartView } from "../views/StartView";
import { useAuthService } from "../services/authService";
import { HighlightedTitle } from "../components/Texts/HighlightedTitle";
import { AxiosError } from "axios";
export function ResendVerifyEmail(){
    const {id} = useParams()
    const [isWarning,setWarning] = useState(false)
    const {isLoading,isError,isSuccess,error} = useQuery({
        retry:2,
        refetchOnWindowFocus:false,
        queryKey:["auth-resend-verify-email"],
        queryFn:async()=> await useAuthService.resendVerifyEmail({
            id:id as string,
        }),
        
        onSuccess:(data)=>{
            console.log(data)
            // ALREADY REPORTED
            if(data.status === 208){
                console.log("IS WARNING")
                const keysError = Object.keys(data.data)
                if(keysError.includes('warning')){
                    setWarning(true)
                }else {
                    setWarning(false)
                }
            } else {
                setWarning(false)
            }
        }
    })

    const getErrorMsg = ()=>{
        if(error instanceof AxiosError){
            console.log(error)
            if(error.response?.data && error.response.data.error) return (error.response?.data.error as string).toUpperCase()
        }
        return "SOMETHING WENT WRONG"
    }
    return (
        <StartView>
            <HighlightedTitle title={"RESEND VERIFICATION EMAIL"}/>
            <LoaderResponse
                isLoading={isLoading}
                isError={isError}
                isSuccess={isSuccess}
                isWarning={isWarning}
                redirect={isWarning||isSuccess ? true : false}
                counterInitialValue={10}
                messages={{
                    error:getErrorMsg(),
                    success:"VERIFICATION EMAIL SENDED",
                    warning:"ACCOUNT ALREADY VERIFIED"
                }}
            />
        </StartView>
    )
    
}