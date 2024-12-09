import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constraints"

export function deleteJWT(){
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
}

export function saveJWT(jwt:{access:string,refresh:string}){
    localStorage.setItem(ACCESS_TOKEN,jwt.access)
    localStorage.setItem(REFRESH_TOKEN,jwt.refresh)
}   

export function getAccessToken(){
    return localStorage.getItem(ACCESS_TOKEN)
}

export function getRefreshToken(){
    return localStorage.getItem(REFRESH_TOKEN)
}