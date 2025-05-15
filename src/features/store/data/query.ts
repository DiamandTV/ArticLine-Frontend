import { HttpMethod } from "@models/Http/HttpMethods";

export const storeCacheKey:Record<HttpMethod,string> = {
    retrieve:'retreive-store',
    create:'create-store',
    list:'list-store',
    update:'update-store',
    delete:'delete-store',
    //listBusiness:'business-fetch-store-list'
}

export const storeCategoryCacheKey:Record<HttpMethod,string> = {
    retrieve:'retrieve-store-category',
    create:'create-store-category',
    list:'list-store-category',
    update:'update-store-category',
    delete:'delete-store-category'
}

export const productCacheKey:Record<HttpMethod,string> = {
    retrieve:'retrieve-product',
    create:'create-product',
    list:'list-product',
    update:'update-product',
    delete:'delete-product'
}