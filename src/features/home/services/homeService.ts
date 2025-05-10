import { apiBearToken } from "@lib/axios/api"

async function list(page:number=1){
    return apiBearToken.get(`/home/store/?page=${page}`)
}

export const homeService = {
    list
}