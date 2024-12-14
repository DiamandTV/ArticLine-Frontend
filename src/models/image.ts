import { Dayjs } from "dayjs";

export interface ImageModel{
    id?:number|string,
    image:string | null,
    created_at?:string|Dayjs,
}