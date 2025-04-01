import { Dayjs } from "dayjs";
import { NotificationEventType } from "./eventType";

export interface NotificationEventModel{
    sender:unknown,
    receiver:unknown,
    notification:NotificationModel,
}

export interface NotificationModel {
    id?:string|number,
    image?:string,
    event_type?:NotificationEventType,
    title?:string,
    message:string,
    created_at:string|Dayjs,
    readen:boolean,
    readen_at:string|Dayjs
}