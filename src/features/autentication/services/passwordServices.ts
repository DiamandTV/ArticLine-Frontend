import { apiBearToken } from "@lib/axios/api";
import { PasswordActualFieldType } from "../models/PasswordChange/PasswordChangeFields";

async function verify(passwordActualInfo:PasswordActualFieldType){
    return await apiBearToken.post('/password/verify/',passwordActualInfo)
}

export const password = {
    verify
}