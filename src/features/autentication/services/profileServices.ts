import { apiBearToken } from "@lib/axios/api"

async function retrieve(){
    return await apiBearToken.get('/profile/retrieve/')
}

export const profileServices = {
    retrieve
}