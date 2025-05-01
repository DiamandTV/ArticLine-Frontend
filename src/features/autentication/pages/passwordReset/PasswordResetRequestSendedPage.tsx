import { AlertCard } from "@components/cards/AlertCard/AlertCard";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";
import { useHistoryStateEraser } from "@hooks/HistoryStateManipulation/useHistoryStateEraser";

import { Navigate, useLocation } from "react-router";

export function PasswordResetRequestSendedStatusPage(){
    useHistoryStateEraser()
    
    const location = useLocation() 
    const state = location.state

    // useEffect(()=>{
    //     //navigator(location,/*{replace:true}*/)
    //     window.history.replaceState({},'')
    // },[])

    if(!state || (state.passwordResetRequestSended === undefined || state.passwordResetRequestSended === null) ) {
        return <Navigate to={'/password/reset/'} replace/>
    }
    return(
        <AuthenticationView>
            {
                state.passwordResetRequestSended ? 
                <AlertCard
                    variant="success"
                    title="📬 Password reset link sent"
                    message="We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password. Don’t forget to check your spam folder too!"
                    /> : 
                <AlertCard
                        variant="danger"
                        title="❌ Failed to send password reset link"
                        message="We were unable to send the password reset email. Please check the email address and try again later, or contact support if the issue persists."
                  />
            }
        </AuthenticationView>
    )
}