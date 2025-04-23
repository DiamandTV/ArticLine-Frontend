import { verificationServices } from "@features/autentication/services/verificationService"
import { useMutation } from "react-query"
import { useNavigate } from "react-router"

interface AuthVerificationResendButtonFromEmailProps extends React.HTMLAttributes<HTMLElement>{
    email:string
}
export function AuthVerificationResendButtonFromEmail({email,...props}:AuthVerificationResendButtonFromEmailProps){
    const navigator = useNavigate()
    const {isLoading,mutateAsync} = useMutation({
        mutationKey:['request-verification-link'],
        mutationFn:async()=>{
            
                return  await verificationServices.verificationResendLink(profileID)
            
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
                                navigator(`/email/verification/${profileID}/status/`,{state:{didVerificationResend:false}})
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
                navigator(`/email/verification/${profileID}/status/`,{state:{didVerificationResend:false}})
            }
        },
        onSuccess:()=>{
            navigator(`/email/verification/${profileID}/status/`,{replace:true,state:{didVerificationResend:true}})
        }
    })
    if(isLoading){
        return <RequestLoadingButton {...props}/>
    }

    return (
        <RequestLinkButton {...props} onClick={
            async()=>{
                await mutateAsync()
            }}
        />
    )
}

function RequestLinkButton(props:AuthVerificationResendButtonProps){
    const className = tailwindMerge("w-full "+props.className)
    return(
        <Button {...props} className={className} size="lg" >
            RESEND LINK
        </Button>
    )
}

function RequestLoadingButton(props:AuthVerificationResendButtonProps){
    const className = tailwindMerge("w-full flex flex-row justify-center items-center gap-2 "+props.className)
    return(
        <Button {...props} className={className} size="lg" >
            <Spinner/>
        </Button>
    )
}