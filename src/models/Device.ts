import { Dayjs } from "dayjs";

// ArticLine Electronic Device model
export interface DeviceModel {
    name:string|null,
    code:string,
    battery:number,
    company:number, // company id
    created_at:string|Dayjs
}