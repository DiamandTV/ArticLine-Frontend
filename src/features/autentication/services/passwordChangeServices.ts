import { apiBearToken } from "@lib/axios/api";
import { PasswordChangeFieldsType } from "../models/PasswordChange/PasswordChangeFields";

async function changePassword(passwordChangeInfo:PasswordChangeFieldsType){
    return await apiBearToken.post('/password/change/',passwordChangeInfo)
}


export const passwordChangeService = {
    changePassword
}