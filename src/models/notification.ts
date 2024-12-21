import { Dayjs } from "dayjs";

export interface NotificationModel{
    image?:string,
    event_type?:string,
    title?:string,
    message:string,
    created_at:string|Dayjs,
    readen:boolean,
    readen_at:string|Dayjs
}