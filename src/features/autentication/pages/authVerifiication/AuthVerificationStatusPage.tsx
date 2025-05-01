import { AuthVerificationResendButton } from "@features/autentication/components/buttons/AuthVerificationResendButton/AuthVerificationResendButton"
import { VerificationResponseStatus } from "@features/autentication/models/VerificationResponse/VerificationResponse"
import { AuthenticationView } from "@features/autentication/view/AuthenticationView/AuthenticationView"
import { Alert } from "react-bootstrap"
import { Variant } from "react-bootstrap/esm/types"
import { useLoaderData } from "react-router"


interface AuthVerificationStatusPageInfo{
    alertColor:Variant,
    title:string,
    message:string,
    action?:React.ReactNode
}

function getStatusPageInfo(responseStatus: VerificationResponseStatus): AuthVerificationStatusPageInfo {
    switch (responseStatus) {
      case VerificationResponseStatus.VERIFIED:
        return {
          alertColor: "success",
          title: "✅ Verifica completata con successo!",
          message:
            "Grazie per aver confermato il tuo indirizzo email. Ora il tuo account è completamente attivo e puoi accedere a tutte le funzionalità della piattaforma. Se non vieni reindirizzato automaticamente, puoi accedere manualmente dal login.",
        }
  
      case VerificationResponseStatus.ALREADY_VERIFIED:
        alert("OK")
        return {
          alertColor: "info",
          title: "ℹ️ Email già verificata",
          message:
            "Sembra che tu abbia già verificato questo indirizzo email in passato. Se hai dimenticato la password o riscontri problemi ad accedere, puoi utilizzare il link 'Password dimenticata' dalla pagina di login.",
        }
  
      case VerificationResponseStatus.EXPIRED:
        return {
          alertColor: "warning",
          title: "⏰ Link di verifica scaduto",
          message:
            "Il link di verifica che hai utilizzato non è più valido. I link di verifica scadono dopo un certo periodo di tempo per motivi di sicurezza. Ti consigliamo di richiedere un nuovo link dalla pagina di registrazione o contattare l'assistenza.",
          action:<AuthVerificationResendButton/>
        }
  
      case VerificationResponseStatus.EMAIL_INVALID:
        return {
          alertColor: "danger",
          title: "🚫 Email non valida",
          message:
            "Non siamo riusciti a verificare il tuo indirizzo email. Potrebbe essere stato inserito in modo errato oppure non è presente nei nostri sistemi. Verifica che l'indirizzo sia corretto o prova a registrarti nuovamente.",
        }
  
      case VerificationResponseStatus.BAD_REQUEST:
        return {
          alertColor: "danger",
          title: "⚠️ Errore nella richiesta",
          message:
            "Si è verificato un errore nella richiesta di verifica. Potrebbe trattarsi di un link incompleto o danneggiato. Prova a cliccare di nuovo sul link ricevuto per email o richiedine uno nuovo.",
        }
  
      default:
        return {
          alertColor: "info",
          title: "❓ Stato non riconosciuto",
          message:
            "Abbiamo ricevuto una risposta che non riusciamo a interpretare correttamente. Ti invitiamo a riprovare oppure a contattare il supporto tecnico per ulteriori informazioni.",
        }
    }
  }

export function AuthVerificationStatusPage(){
    // typeof verification account type
    const result = useLoaderData()
    console.log(result)
    //if(!result) return null
    const { alertColor, title, message, action } = getStatusPageInfo(result)
    return(
      <AuthenticationView>
          <Alert variant={alertColor} className="w-full flex flex-col justify-center items-center border-2">
              <h1 className="text-2xl">{title}</h1>
              <p>
                  {message}
              </p>
              
          </Alert>
          {action}
      </AuthenticationView>
    )
}
