import { Dayjs } from "dayjs";

export interface CategoryModel{
    id:number,
    image:string,
    name:string,
    description?:string,
    created_at?:string | Dayjs
}