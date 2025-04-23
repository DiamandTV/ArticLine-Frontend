import { api } from "@lib/axios/api";
import { PasswordResetFieldsType } from "../models/PasswordReset/PasswordResetFields";

async function passwordResetRequest(email:string){
    return await api.post(`/password/reset/`,{
        email
    })
}

async function passwordResetCheckToken(token:string){
    return await api.post(`/password/reset/check/${token}/`)
}

async function passwordReset(token:string|undefined,params:PasswordResetFieldsType){
    return await api.post(`/password/reset/${token}/`,params)
}

export const passwordResetServices = {
    passwordResetRequest,
    passwordResetCheckToken,
    passwordReset
}