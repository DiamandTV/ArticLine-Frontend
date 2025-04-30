import { apiBearToken } from "@lib/axios/api"

// async function list(page:number=1){
//     return apiBearToken.get(`/articline/categories/?page=${page}`)
// }


async function list(){
    return apiBearToken.get(`/articline/categories/`)
}

export const categoryService = {
    list
}