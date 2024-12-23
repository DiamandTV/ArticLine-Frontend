import { Dayjs } from "dayjs";

export interface NotificationEventModel{
    sender:unknown,
    receiver:unknown,
    notification:NotificationModel,
}

export interface NotificationModel {
    id?:string|number,
    image?:string,
    event_type?:string,
    title?:string,
    message:string,
    created_at:string|Dayjs,
    readen:boolean,
    readen_at:string|Dayjs
}