import { AxiosError } from "axios"

export const ACCESS_TOKEN  =   'ARTICLINE-ACCESS-JWT-TOKEN'
export const REFRESH_TOKEN =   'ARTICLINE-REFRESH-JWT-TOKEN'

export const SERVER_INTERNAL_ERROR_CODE = 500

export const SIDEBAR_ICON_SIZE = 22.5
export const SIDEBAR_SUB_ICON_SIZE = 18.5

export const MINIMUM_TEMPERATURE_RANGE:number = 5 // minimum temperature range which the user can choose is 5 degree

export const MAX_CARD_IN_PAGE:number = 2

export function checkForError(error:unknown){
    if(error instanceof AxiosError && error.status != SERVER_INTERNAL_ERROR_CODE){
        try{
            if(error.response?.data) return error.response.data
        }catch(e){
            console.log(e)
        }
    }
    return null
}
