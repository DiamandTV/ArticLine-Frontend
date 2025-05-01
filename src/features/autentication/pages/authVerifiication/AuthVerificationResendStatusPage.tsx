import { AlertCard } from "@components/cards/AlertCard/AlertCard";
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView";
import { useHistoryStateEraser } from "@hooks/HistoryStateManipulation/useHistoryStateEraser";
import { Navigate, useLocation } from "react-router";

const getComponentInfo = (verificationResended: boolean) => {
    if (verificationResended) {
      return {
        variant: 'success',
        title: '📬 Link sent successfully',
        message:
          "We've sent you a new verification link to the provided email address. Please check your inbox (and also the spam folder) to complete the verification.",
      };
    } else {
      return {
        variant: 'danger',
        title: '❌ Failed to send verification link',
        message:
          "We couldn't send the verification link. There might have been an issue with the server, or the email address provided may be invalid. Please try again in a few minutes or contact support.",
      };
    }
  };
  

export function AuthVerificationResendStatusPage(){
  useHistoryStateEraser()
  
  const location = useLocation()
  const state = location.state

  // useEffect(()=>{
  // //     //navigator(location,/*{replace:true}*/)
  //      window.history.replaceState({},'')
  // },[])

  if(!state || (state['didVerificationResend'] === undefined ||  state['didVerificationResend'] === null)) return <Navigate to={"/login/"} replace/> 
  const verificationResended = state && state['didVerificationResend'] === true ? true  : false

  return(
      <AuthenticationView>
          <AlertCard {...getComponentInfo(verificationResended)}/>
      </AuthenticationView>
  )
}
