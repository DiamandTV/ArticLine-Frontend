import { LoaderResponse } from "../components/loader/LoaderResponse"
import { StartView } from "../views/StartView"
import { HighlightedTitle } from "../components/Texts/HighlightedTitle"
import { PasswordResetForm } from "../components/forms/PasswordResetForm"
import { useQuery } from "@tanstack/react-query"
export function PasswordReset(){
    const {isLoading,isSuccess,isError,error} = useQuery({})
    return ( 
        <StartView>
            <div className="w-full flex flex-col justify-center items-center gap-y-8">
                <HighlightedTitle title="PASSWORD RESET"/>
                {isLoading && 
                    <LoaderResponse
                        isLoading={isLoading}
                        isError={isError}
                        messages={{
                            error:"WRONG LINK",
                            success:"",
                            warning:""
                        }}
                    />}
                {isSuccess && <PasswordResetForm/>}
            </div>  
        </StartView>
    )
}