import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';
function isAdult(dateStr:string,adultAge:number):boolean{
    const date:Dayjs = dayjs(dateStr)
    const now:Dayjs = dayjs()
    const difference = now.diff(date,'year',true)
    if(difference >= adultAge ) return true
    return false
}

export const adultValidator = z.string().refine((val)=>isAdult(val,18),"You aren't adult")