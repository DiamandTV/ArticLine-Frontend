import { apiBearToken } from "@lib/axios/api";

async function list(storeId:number,storeCategoryId:number,page:number=1){
    return await apiBearToken.get(`/store/${storeId}/category/${storeCategoryId}/product/list/?page=${page}`)
}

export const storeBusinessProductServices = {
    list
}