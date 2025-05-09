import { StoreInterface } from "../../Store/Interface/StoreInterface";

export interface StoreCategoryInterface{
    id:number,
    store:StoreInterface,

    image:string,
    name:string,
    description:string

    order:number,


}