import axios, { InternalAxiosRequestConfig } from "axios"
import { getAccessToken } from "./jwt";

const api = axios.create({
    baseURL:"http://192.168.1.249:8000"
})


export interface InternalAxiosRequestConfigCustom extends InternalAxiosRequestConfig{
    withoutAuth?:boolean,
}

api.interceptors.request.use((config:InternalAxiosRequestConfigCustom)=>{
        const accessKey = getAccessToken();
        console.log(config.withoutAuth)
        if(config.withoutAuth){
            console.log(config)
            return config;
        }
        if(accessKey){
            
            config.headers.Authorization = `Bearer ${accessKey}`
        }
        return config
    },
    (error)=>Promise.reject(error)
)

function removeAuthorization():Partial<InternalAxiosRequestConfigCustom>{
    return {
        withoutAuth:true
    }
}


export {api,removeAuthorization}



