import { api } from "@lib/axios/api";

async function verification(profileID:string,token:string){
    return await api.get(`/email/verify/${profileID}/${token}/`)
}

async function verificationResendLink(profileID:string){
    return await api.post(`/email/resend/${profileID}/`)
}

async function verificationResendLinkFromEmail(email:string){
    return await api.post(`/email/resend/`,{email:email})
}

export const verificationServices = {
    verification,
    verificationResendLink,
    verificationResendLinkFromEmail
}