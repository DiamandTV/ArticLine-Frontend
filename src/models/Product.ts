import { StoreModel } from "./store";

export interface ProductModel{
    image:string|null,
    name:string,
    description:string,
    store:number,
    price:number,
    store_category:number,
    temperature_start_range:number,
    temperature_end_range:number
}