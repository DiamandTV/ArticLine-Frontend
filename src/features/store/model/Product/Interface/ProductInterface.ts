import { StoreCategoryInterface } from "../../StoreCategory/Interface/StoreCategoryInterface";

export interface ProductInterface{
    id:number,

    image:string,
    name:string,
    description:string,

    price:number,
    store_category:StoreCategoryInterface,

    temperature_start_range:number,
    temperature_end_range:number
}