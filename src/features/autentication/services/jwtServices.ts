import { api } from "@lib/axios/api"

async function refresh(refresh:string){
    return api.post('/refresh/',{refresh})
}

async function verify(access:string){
    return api.post('/jwt/verify/',{access})
}

export const jwtServices = {
    refresh,
    verify
}