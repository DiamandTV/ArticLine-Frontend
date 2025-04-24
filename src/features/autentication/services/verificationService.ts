import { api } from "@lib/axios/api";

async function verification(authID:string,token:string){
    return await api.get(`/email/verify/${authID}/${token}/`)
}

async function verificationResendLink(authID:string){
    return await api.post(`/email/resend/${authID}/`)
}

async function verificationResendLinkFromEmail(email:string){
    return await api.post(`/email/resend/`,{email:email})
}

export const verificationServices = {
    verification,
    verificationResendLink,
    verificationResendLinkFromEmail
}