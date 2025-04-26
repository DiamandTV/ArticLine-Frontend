import { AlertCard } from "@components/cards/AlertCard/AlertCard"
import { AuthenticationResponseStatusType, AuthenticationResponseType } from "@features/autentication/models/AutenticationResponse/AuthenticationResponse"
import { authSliceActions } from "@features/autentication/slices/authSlice"
import { apiBearToken } from "@lib/axios/api"
import { ServerErrorsAndTypeInterface } from "@models/ApiResponse/ErrorResponse/ServerErrorResponseInterface"
import { store } from "@store/store"
import { decodeServerPayloadMsg } from "@utils/serverErrorDecode/errorDecode"
import { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"

enum RequestSubmitPosition {
    INSIDE,
    OUTSIDE
}

export async function tokenErrorInterceptor(error:AxiosError):Promise<AxiosResponse|AxiosError>{
    const params = error.config?.params
    if(error.response ){
        if(params && params.requestSubmitPosition === RequestSubmitPosition.INSIDE) {
            console.log("NOT DOING IT AGAIN")
            await store.dispatch(authSliceActions.clearSession())
            await store.dispatch(authSliceActions.clearProfile())
            return Promise.reject(error)
        } 
        //const statusCode = error.response.status
        const errorDetail = error.response.data as ServerErrorsAndTypeInterface
        if(errorDetail.type === 'client_error'){
            const messages = decodeServerPayloadMsg(error)
            if(messages.length > 0 ){
                const handledErrors:Array<string> = []
                messages.forEach(async (message)=>{
                    if(Object.keys(AuthenticationResponseStatusType).includes(message)){
                        if(handledErrors.includes(message)) return
                        handledErrors.push(message)
                        switch(message as AuthenticationResponseType){
                            case 'token_not_valid':
                                // the token may be expired , try to refresh it
                                 
                                    { const refreshed = await store.dispatch(authSliceActions.refreshToken()).unwrap()
                                    if(refreshed){
                                        console.log(refreshed)
                                        console.log("REDOING REQUEST")
                                        const params = {...error.config?.params,requestSubmitPosition:RequestSubmitPosition.INSIDE}
                                        return await apiBearToken.request({...error.config,params})
                                        
                                    } else {
                                        toast(
                                            <AlertCard
                                            variant="warning"
                                            title="🔒 Session expired"
                                            message="Your session has ended for security reasons. Please log in again to continue."
                                        />,{
                                                className:"w-full",
                                                position:"top-center",
                                                hideProgressBar:true
                                            }
                                        )
                                    
                                     
                                } }
                        }
                    }
                })
            }
        }
    }
    return Promise.reject(error)
}