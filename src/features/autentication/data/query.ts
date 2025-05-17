import { HttpMethod } from "@models/Http/HttpMethods";

export const entityAddressCacheKey:Record<HttpMethod,string> = {
    retrieve:'retrieve-entity-address',
    create:'create-entity-address',
    list:'list-entity-address',
    update:'update-entity-address',
    delete:'delete-entity-address'
}

