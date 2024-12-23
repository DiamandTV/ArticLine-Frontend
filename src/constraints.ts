import { AxiosError } from "axios"

export const ACCESS_TOKEN  =   'ARTICLINE-ACCESS-JWT-TOKEN'
export const REFRESH_TOKEN =   'ARTICLINE-REFRESH-JWT-TOKEN'

export const SERVER_INTERNAL_ERROR_CODE = 500

export const SIDEBAR_ICON_SIZE = 22.5
export const SIDEBAR_SUB_ICON_SIZE = 18.5

export const MINIMUM_TEMPERATURE_RANGE:number = 5 // minimum temperature range which the user can choose is 5 degree

export const MAX_CARD_IN_PAGE:number = 2

// The regex to understand if the image is an url or base 64. If it's an url don't send it 
export const urlPattern = new RegExp('https?:\\/\\/(\\w+:?\\w*@)?([\\w.-]+)(:\\d+)?(\\/[^\\s]*)?', 'i');

export const MAX_COUNTER_VALUE = 20

// The user can has maximum 10 different cart contemporanaly
export const MAX_CART_LENGTH = 10
export const CART_SECTOR =     'ARTICLINE-CART-SECTOR'

// Time to add to the order
export const ORDER_MINUTES_OFFSET = 30

// Early delivery request tool kit message
export const TOOLKIT_EARLY_MESSAGE = 'The user has choosen the earliest delivey option please give him a delivery time'

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
