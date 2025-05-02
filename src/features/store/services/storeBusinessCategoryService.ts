import { apiBearToken } from "@lib/axios/api"

async function list(storeId:number,page:number=1){
    return await apiBearToken.get(`/store/${storeId}/category/list/?page=${page}`)
}

export const storeBusinessCategoryServices = {
    list
}