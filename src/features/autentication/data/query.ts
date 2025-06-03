import { HttpMethod } from "@models/Http/HttpMethods";

type EntityAddressCacheKeyInterface = HttpMethod | 'setDefault'


export const entityAddressCacheKey:Record<EntityAddressCacheKeyInterface,string> = {
    retrieve:'retrieve-entity-address',
    create:'create-entity-address',
    list:'list-entity-address',
    update:'update-entity-address',
    delete:'delete-entity-address',

    setDefault:'set-default-entity-address',
}

export const profileCacheKey = {
    retrieve:'retrieve-profile',
    update:'update-profile',
    delete:'delete-profile'
}