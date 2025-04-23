import { PasswordResetForm } from "@features/autentication/components/forms/PasswordResetForm/PasswordResetNewForm.tsx/PasswordResetForm";
import { PasswordResetHeaderText } from "@features/autentication/components/texts/PasswordResetText/Headers/PasswordResetHeaderText";
import { PasswordResetCheckResponseStatus } from "@features/autentication/models/PasswordResetResponse/PasswordResetCheckResponse";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";
import { Navigate, useLoaderData } from "react-router";

export function PasswordResetPage(){
    const result = useLoaderData()
    if(!result || result !== PasswordResetCheckResponseStatus.TOKEN_VERIFIED){
        return <Navigate to={'/password/reset/status/'} state={{status:result}}/>
    }
    return(
        <AuthenticationView>
            <PasswordResetHeaderText/>
            <PasswordResetForm/>
        </AuthenticationView>
    )
}