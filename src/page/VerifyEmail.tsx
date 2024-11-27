import { StartView } from "../views/StartView"
import { useQuery } from "@tanstack/react-query"
import { LoaderResponse } from "../components/loader/LoaderResponse"
import { useAuthService } from "../services/authService"
import { useNavigate, useParams } from "react-router-dom"
import { AxiosError } from "axios"
import { useState } from "react"
import { TextButton } from "../components/buttons/TextButtons"
import { HighlightedTitle } from "../components/Texts/HighlightedTitle"
export function VerifyEmail({resendEmail}:{resendEmail:()=>void}){
    const {id,token} = useParams()
    const navigate = useNavigate()
    if(!id || !token){
        navigate("*")
    }

    const [isWarning,setWarning] = useState(false)
    const {isLoading,isError,isSuccess,error} = useQuery({
        retry:2,
        queryKey:["auth-verify-email"],
        queryFn:async()=> await useAuthService.verifyEmail({
            id:id as string,
            token:token as string
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
            return (error.response?.data.error as string).toUpperCase()
        }
        return "SOMETHING WENT WRONG"
    }
    return (    
        <StartView>
            <div className="w-full flex flex-col justify-center items-center gap-y-8">
                <HighlightedTitle title="VERIFICATION EMAIL"/>
                <LoaderResponse
                    isLoading={isLoading}
                    isError={isError}
                    isSuccess={isSuccess}
                    isWarning={isWarning}
                    counterInitialValue={10}
                    messages={{
                        error:getErrorMsg(),
                        success:"ACCOUNT VERIFIED",
                        warning:"ACCOUNT ALREADY VERIFIED"
                    }}
                />
                 <TextButton
                    text="RESEND THE EMAIL"
                    onClick={()=>{
                        console.log("sdsdsds")
                        resendEmail()
                    }}
                />
            </div>
        </StartView>
    )
} 