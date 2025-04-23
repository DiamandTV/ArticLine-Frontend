import { AlertCard } from "@components/cards/AlertCard/AlertCard";
import { PasswordResetResponseStatus } from "@features/autentication/models/PasswordResetResponse/PasswordResetResponse";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";
import { useHistoryStateEraser } from "@hooks/HistoryStateManipulation/useHistoryStateEraser";
import { Navigate, useLocation } from "react-router";


function getStatusPasswordResetResponse(serverResponse:PasswordResetResponseStatus){

    switch (serverResponse) {
        case PasswordResetResponseStatus.TOKEN_INVALID:
          return {
            variant: 'danger',
            title: '❌ Invalid reset token',
            message:
              "The password reset link is invalid. It may have already been used or is incorrect. Please request a new one and try again.",
          };
    
        case PasswordResetResponseStatus.TOKEN_EXPIRED:
          return {
            variant: 'warning',
            title: '⏳ Reset token expired',
            message:
              "Your password reset token has expired. Please request a new password reset link and try again.",
          };
    
        case PasswordResetResponseStatus.LINK_EXPIRED:
          return {
            variant: 'warning',
            title: '📪 Reset link expired',
            message:
              "The password reset link has expired or is no longer valid. You’ll need to request a new one to continue.",
          };
    
        case PasswordResetResponseStatus.PASSWORD_CHANGED:
          return {
            variant: 'success',
            title: '✅ Password changed successfully',
            message:
              "Your password has been updated. You can now log in with your new credentials.",
          };
    
        default:
          return {
            variant: 'info',
            title: 'ℹ️ Status unknown',
            message:
              "We couldn't determine the status of your password reset. Please try again or contact support if the issue continues.",
          };
      }
}


export function PasswordResetStatusPage(){
  useHistoryStateEraser()
  
  const location = useLocation()
  const state = location.state
 
    //   useEffect(()=>{
  //     //navigator(location,/*{replace:true}*/)
  //     window.history.replaceState({},'')
  // },[])
    
    if(!state || !!state.status === false){
      return <Navigate to={'/password/reset/'} replace/>
    }

    
    return(
        <AuthenticationView>
            <AlertCard {...getStatusPasswordResetResponse(state.status )}
            />
        </AuthenticationView>
    )
}