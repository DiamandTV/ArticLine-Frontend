// import { JWTInterface } from "@features/autentication/models/Jwt/JwtInterfaces"
// import { ProfileInterface } from "@features/autentication/models/Profile/Interface/Type"
// import { jwtServices } from "@features/autentication/services/jwtServices"
// import { profileServices } from "@features/autentication/services/profileServices"
// import { authSliceActions } from "@features/autentication/slices/authSlice"
// import { isJWTValidate } from "@features/autentication/utils/jwt/jwt"
// import { store } from "@store/store"
// import { AxiosError } from "axios"

import { authSliceActions } from "@features/autentication/slices/authSlice";
import { store } from "@store/store";


export async function authenticationLoader(){
    return await store.dispatch(authSliceActions.initSession()).unwrap()
}
// export async function authenticationLoader(){
//     const jwt = store.getState().authReducer.jwt
//     if(!jwt) {
//         // todo: do something negative
//         return null
//     }
//     if(!isJWTValidate(jwt)){
//         return null
//     }

//     try{
//         // get the profile
//         return await retriveProfile()
//     }catch(e){
//         if(e instanceof AxiosError){
//             // auth token is expired or invalid
//             const refreshed = await refreshToken(jwt.access)
//             if(refreshed){
//                 // auth token refreshed , now retreive the user profile
//                 try{
//                     return await retriveProfile()
//                 }catch(e){
//                     console.log(e)
//                     return null
//                 }
//             } 
//         }    
       
//     }
//     return null
// }

// async function refreshToken(refresh:string):Promise<JWTInterface | null>{
//     try{
//         const response = await jwtServices.refresh(refresh)
//         const data:{access:string} = response.data
//         const access = data.access
//         const jwt:JWTInterface = {
//             access,
//             refresh
//         }
//         // save the jwt in redux
//         store.
//             dispatch(
//                 (authSliceActions.setSession(jwt))
//             )
//         // 
//         return jwt
//     }catch(e){
//         console.log(e)
//     }
//     // clear the jwt in redux
//     store.dispatch(authSliceActions.clearSession())
//     //
//     return null
// }

// async function retriveProfile():Promise<ProfileInterface>{
//     const response = await profileServices.retrieve()
//     const profile:ProfileInterface = response.data
    
//     // set the profile in redux
//     store.dispatch(authSliceActions.setProfile(profile))
//     //
//     return profile
// }