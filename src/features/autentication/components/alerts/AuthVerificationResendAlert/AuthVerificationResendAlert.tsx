import { AlertCard } from "@components/cards/AlertCard/AlertCard";
import { NavigatorProvider } from "@context/NavigatorContext/NavigatorProvider";
import { AuthVerificationResendButton } from "../../buttons/AuthVerificationResendButton/AuthVerificationResendButton";
import { NavigateFunction } from "react-router";
import { ToastContentProps } from "react-toastify";

interface AuthVerificationResendAlertProps extends ToastContentProps{
    authID:string,
    navigator:NavigateFunction
}
export function AuthVerificationResendAlert({authID,navigator,closeToast}:AuthVerificationResendAlertProps){
    const onClick = ()=>{
        closeToast()
    }
    return(
        <NavigatorProvider navigator={navigator}>
            <div className="w-full flex flex-col gap-2 justify-center items-center">
                <AlertCard
                    variant="warning"
                    title="⚠️ Email verification required"
                    message="You need to verify your email before you can log in. Please check your inbox for the verification link, or request a new one if needed." 
                />
                <AuthVerificationResendButton authID={authID} onClick={onClick}/>
            </div>
        </NavigatorProvider>
    )
}