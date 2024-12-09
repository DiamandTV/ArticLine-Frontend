import { Dayjs } from "dayjs"
import { AddressModel } from "./address"
import { StoreCategoriesModel } from "./StoreCategories"
import { ImageModel } from "./image"
export interface StoreModel{
    id:number,
    images:Array<ImageModel>,
    company_profile:number,
    title:string,
    description:string,
    categories:Array<number>,
    store_categories?:Array<StoreCategoriesModel>,
    average_rating:number,
    ratings:number,
    views:number,
    address:AddressModel,
    is_certificated:boolean,
    created_at:string | Dayjs
}