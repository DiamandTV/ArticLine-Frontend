import { ProfileInterface } from "@features/autentication/models/Profile/Interface/Type";
import { StoreInterface } from "@features/store/model/Store/Interface/StoreInterface";

export interface CartInterface{
    id:number,
    profile:ProfileInterface,
    store:StoreInterface,
    is_checkout:boolean,
    cartItems_count:number,
    subtotal_cost:number,
    shipping_cost:number
}

