// ArticLine Company model
import {BaseUserModel} from "./baseUser"

export interface CompanyModel{
    user:BaseUserModel,
    categories:Array<string>,
    description:string,
    is_certificated:boolean
}