import { LoaderResponse } from "../components/Loader/LoaderResponse"
import { StartView } from "../views/StartView"
import { HighlightedTitle } from "../components/Texts/HighlightedTitle"
import { PasswordResetForm } from "../components/Forms/PasswordResetForm"
import { useQuery } from "@tanstack/react-query"
import { useAuthService } from "../services/authService"
import { useParams } from "react-router-dom"
import { AxiosError } from "axios"
export function PasswordReset(){
    const {token} = useParams()
    const {isLoading,isSuccess,isError,error} = useQuery({
        refetchOnWindowFocus:false,
        queryKey:["auth-check-password-token"],
        queryFn:async ()=> await useAuthService.checkResetPasswordToken({token:token as string}),
        onSuccess:(data)=>console.log(data)
    })
    
    const getErrorMsg = ()=>{
        if(error instanceof AxiosError){
            try{
                return (error.response?.data.error as string).toUpperCase()
            }catch(e){
                return "SOMETHING WENT WRONG"
            }
        }
        return "SOMETHING WENT WRONG"
    }

    return ( 
        <StartView>
            <div className="w-full flex flex-col justify-center items-center gap-y-8">
                <HighlightedTitle title="PASSWORD RESET"/>
                {(isLoading||isError) && 
                    <LoaderResponse
                        isLoading={isLoading}
                        isError={isError}
                        redirect={false}
                        messages={{
                            error:getErrorMsg(),
                            success:"",
                            warning:""
                        }}
                    />}
                
                {isSuccess && <PasswordResetForm showLoader={true} token={token as string}/>}
            </div>  
        </StartView>
    )
}