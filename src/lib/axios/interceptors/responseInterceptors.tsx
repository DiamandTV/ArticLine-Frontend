import { AlertCard } from "@components/cards/AlertCard/AlertCard"
import { ServerErrorsAndTypeInterface } from "@models/ApiResponse/ErrorResponse/ServerErrorResponseInterface"
import { AxiosError, AxiosResponse } from "axios"
import { Alert } from "react-bootstrap"
import { toast } from "react-toastify"

type ErrorInterceptorType = (error:AxiosError)=>Promise<AxiosError|AxiosResponse>|undefined
export function getErrorInterceptor(errorFn:Array<ErrorInterceptorType>){
    return (error:AxiosError)=>{
        const responseInterceptors = errorFn.map((fn)=>fn(error))
        return responseInterceptors[responseInterceptors.length-1]
    }
}

export function defaultErrorInterceptor(error:AxiosError):undefined{
    if(error.response){
        const statusCode = error.response.status
        const errorDetail = error.response.data as ServerErrorsAndTypeInterface
        if(statusCode === 401){
            // UNAUTHORIZED ROUTE
        }
        
        if(errorDetail.type === 'server_error'){         
            toast(
                <AlertCard
                    variant="danger"
                    title="💥 Something went wrong"
                    message="There was a problem processing your request. Please try again later, or contact support if the issue continues."
                    />,
                {
                    className:"w-full",
                    position:"top-center",
                    hideProgressBar:true
                }
              );
        }
    } else if (error.request){
        //  NO RESPONSE RECEIVED (NETWORK ERROR, TIMEOUT , ETC...)
        toast(
            <AlertCard
              variant="danger"
              title="🌐 Network issue"
              message="We couldn’t connect to the server. Please check your internet connection and try again."
            />,
            {
                className:"w-full",
                position:"top-center",
                hideProgressBar:true
            }
          );
    }
    else{
        toast(
            <Alert variant="danger">
                SOMETHING WENT WRONG
            </Alert>
        )
    }
}

// export function tokenErrorInterceptor(error:AxiosError){
//     if(error.response){
//         //const statusCode = error.response.status
//         const errorDetail = error.response.data as ServerErrorsAndTypeInterface
//         if(errorDetail.type === 'client_error'){
//             const messages = decodeServerPayloadMsg(error)
//             if(messages.length > 0 ){
//                 messages.forEach((message)=>{
//                     if(Object.keys(AuthenticationResponseStatusType).includes(message)){
//                         switch(message as AuthenticationResponseType){
//                             case 'token_not_valid':
//                                 // the token may be expired , try to refresh it
//                                 toast(
//                                     <AlertCard
//                                     variant="warning"
//                                     title="🔒 Session expired"
//                                     message="Your session has ended for security reasons. Please log in again to continue."
//                                   />,{
//                                         className:"w-full",
//                                         position:"top-center",
//                                         hideProgressBar:true
//                                     }
//                                 )
//                         }
//                     }
//                 })
//             }
//         }
//     }
// }

