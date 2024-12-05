import { Dayjs } from "dayjs";

export interface CategoryModel{
    image:string,
    name:string,
    description?:string,
    created_at?:string | Dayjs
}