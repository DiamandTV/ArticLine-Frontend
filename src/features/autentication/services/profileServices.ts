import { apiBearToken } from "@lib/axios/api"
import { ProfileInterface } from "../models/Profile/Interface/Type"

async function retrieve(){
    return await apiBearToken.get('/profile/retrieve/')
}

async function update(profileInfo:ProfileInterface){
    return await apiBearToken.patch('/profile/update/',profileInfo)
}

async function _delete(){
    return await apiBearToken.delete('/profile/delete/')
}

export const profileServices = {
    retrieve,
    update,
    delete:_delete
}