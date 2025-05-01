import { HOST_URL } from "@data/server";

import axios from "axios";
import { defaultErrorInterceptor, getErrorInterceptor } from "./interceptors/responseInterceptors";
import { tokenErrorInterceptor } from "@features/autentication";
import { permissionErrorInterceptor } from "@features/autentication/utils/interceptors/responseInterceptors";


export const api = axios.create({
    baseURL:HOST_URL
})

api.interceptors.response.use(
    // ? SUCCESS
    // (/*respone:AxiosResponse<any,any>*/):AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>=>{

    // },
    null,
    // ? ERROR
    getErrorInterceptor([defaultErrorInterceptor])
)

export const apiBearToken = axios.create({
    baseURL:HOST_URL
})

apiBearToken.interceptors.response.use(
    null,
    getErrorInterceptor([defaultErrorInterceptor,permissionErrorInterceptor,tokenErrorInterceptor])
)

apiBearToken.interceptors.request.use(
    async(config)=>{
        const store = (await import('@store/store')).store
        const authReducer = store.getState()?.authReducer
        
        if(authReducer && authReducer.jwt){
            const access = authReducer.jwt.access
            console.log(access)
            config.headers.Authorization = `Bearer ${access}`
        }
        return config
    }
)