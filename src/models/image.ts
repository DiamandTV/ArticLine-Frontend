import { Dayjs } from "dayjs";

export interface ImageModel{
    image:string | null,
    created_at?:string|Dayjs,
}