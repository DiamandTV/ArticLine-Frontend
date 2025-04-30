
// import { ThunkDispatch } from "@reduxjs/toolkit";
// import { api, apiBearToken } from "../api";
// import { AxiosError } from "axios";

// export interface BaseQueryApi {
//     signal: AbortSignal
//     abort: (reason?: string) => void
//     dispatch: ThunkDispatch<any, any, any>
//     getState: () => unknown
//     extra: unknown
//     endpoint: string
//     type: 'query' | 'mutation'
//     forced?: boolean
//   }
  

// export const axiosBaseQuery = ({jwt}:{jwt?:boolean} = {jwt:true})=>{
//     return async({signal,}:BaseQueryApi)=>{
//         let result = null
//         try{
//             if(jwt){
//                 result = await apiBearToken({url,method,data,params})
//             } else {
//                 result = await api({url,method,data,params})
//             } 
//             return {
//                 data:result
//             }
//         }catch(err){
//             if(err instanceof AxiosError){
//                 return {
//                     error:err
//                 }
//             }
//         }
        
//     }
    
// }