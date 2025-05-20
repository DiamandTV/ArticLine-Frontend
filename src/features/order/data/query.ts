import { HttpMethod } from "@models/Http/HttpMethods";

export const orderCacheKey:Record<HttpMethod,string> = {
    retrieve:'retrieve-order',
    create:'create-order',
    list:'list-order',
    update:'update-order',
    delete:'delete-order',

}

