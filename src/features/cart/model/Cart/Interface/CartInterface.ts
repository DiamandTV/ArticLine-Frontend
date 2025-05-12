import { ProfileInterface } from "@features/autentication/models/Profile/Interface/Type";
import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface";

export interface CartInterface{
    id:number,
    profile:ProfileInterface,
    store:StoreInterface,
    is_checkout:boolean
}

