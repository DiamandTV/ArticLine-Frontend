import { AlertCard } from "@components/cards/AlertCard/AlertCard";
import { VerificationResendResponseMapStatusType, VerificationResendResponseStatus, VerificationResendResponseType } from "@features/autentication/models/VerificationResponse/VerificationResendResponse";
import { verificationServices } from "@features/autentication/services/verificationService";
import { useGlobalNavigate } from "@hooks/useNavigateCopy/useNavigate";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { AxiosError } from "axios";
import { Button, Spinner } from "react-bootstrap";
import { useMutation } from "react-query";
import { useParams } from "react-router";
import {  toast } from "react-toastify";

interface ResendButtonProps extends React.HTMLAttributes<HTMLElement>{
    authID?:string
}
function ResendButton({authID,...props}:ResendButtonProps){
    const navigator = useGlobalNavigate()
    const {isLoading,mutateAsync} = useMutation({
        mutationKey:['request-verification-link'],
        mutationFn:async()=>{
            if(authID){
                return  await verificationServices.verificationResendLink(authID)
            }
        },
        onError:(error)=>{

            if(error instanceof AxiosError){
                const messageWithPayload = error.response?.data.error?.[0].code
                if(messageWithPayload){
                    const message = (messageWithPayload as string).replace(/^.*]-/,'')
                    if(message && Object.keys(VerificationResendResponseMapStatusType).includes(message)){
                        switch(VerificationResendResponseMapStatusType[message as VerificationResendResponseType]){
                            case VerificationResendResponseStatus.EMAIL_ERROR:
                                // redirect to Verification Resend Status with !!!"ERROR STATUS"!!!
                                navigator(`/email/verification/${authID}/status/`,{state:{didVerificationResend:false}})
                                return
                            case VerificationResendResponseStatus.EMAIL_REQUEST_LIMIT:
                                toast(
                                    <AlertCard
                                        variant="danger"
                                        title="🕒 Link già richiesto di recente"
                                        message="Hai già richiesto un link di verifica poco fa. Per motivi di sicurezza, puoi effettuare una nuova richiesta tra qualche minuto. Ti chiediamo di avere un po’ di pazienza 🙏"
                                    />,
                                    {
                                        // opzionale
                                        className:"w-full",
                                        position: "top-center", // centra il testo
                                        hideProgressBar: true,      // 💥 disattiva la barra
                                      }
                                )
                                // show an alert to tell the user to wait and retry later
                                return
                        }
                    } 
                }
                navigator(`/email/verification/${authID}/status/`,{state:{didVerificationResend:false}})
            }
        },
        onSuccess:()=>{
            navigator(`/email/verification/${authID}/status/`,{replace:true,state:{didVerificationResend:true}})
        }
    })

    
    if(isLoading){
        return <RequestLoadingButton {...props}/>
    }

    return (
        <RequestLinkButton {...props} onClick={
            async(event:React.MouseEvent<HTMLElement>)=>{
                props.onClick?.(event)
                await mutateAsync()
            }}
        />
    )
}


export function AuthVerificationResendButton(props:Omit<ResendButtonProps,'authID'> & {authID?:string}){
    const params = useParams()
    let authID = params['id']
    if(!authID){
        authID = props.authID 
    }
    return <ResendButton {...props} authID={authID} />
}


function RequestLinkButton(props:Omit<ResendButtonProps,'id'>){
    const className = tailwindMerge("w-full ",props.className)
    return(
        <Button {...props} className={className} size="lg" >
            RESEND LINK
        </Button>
    )
}

function RequestLoadingButton(props:Omit<ResendButtonProps,'id'>){
    const className = tailwindMerge("w-full flex flex-row justify-center items-center gap-2 ",props.className)
    return(
        <Button {...props} className={className} size="lg" >
            <Spinner/>
        </Button>
    )
}