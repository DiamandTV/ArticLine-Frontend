import { apiBearToken } from "@lib/axios/api"

async function list(){
    return apiBearToken.get('/articline/categories/')
}

export const categoryService = {
    list
}