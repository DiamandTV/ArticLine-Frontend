import { useState } from "react";
import { VerifyEmail } from "./VerifyEmail";
import { ResendVerifyEmail } from "./ResendVerifyEmail";

export function EmailAndResend(){
    const [resend,setResend] = useState(false)
    return resend ? <ResendVerifyEmail/> : <VerifyEmail resendEmail={()=>setResend(true)}/>

}