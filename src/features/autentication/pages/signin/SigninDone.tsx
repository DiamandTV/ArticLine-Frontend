import { SigninDoneText } from "@features/autentication/components/texts/SigninText/SigninDoneText/SigninDoneText";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";
import {  Navigate, useLocation } from "react-router";
export function SigninDone(){
    const {state} = useLocation()
    if(!state || !state['didSignin']) return <Navigate to={'/'} replace/>
    
    return(
        <AuthenticationView>
           <SigninDoneText/>
        </AuthenticationView>
    )
}