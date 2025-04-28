import { apiBearToken } from "@lib/axios/api"

async function list(page:number=1){
    return apiBearToken.get(`/articline/categories/?page=${page}`)
}

export const categoryService = {
    list
}