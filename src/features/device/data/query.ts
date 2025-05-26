import { HttpMethod } from "@models/Http/HttpMethods";

export const deviceCacheKey:Record<HttpMethod,string> = {
    retrieve:'retrieve-device',
    create:'create-device',
    list:'list-device',
    update:'update-device',
    delete:'delete-device'
}