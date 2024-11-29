import api from "./api";
import { ACCESS_TOKEN } from "../constraints";
import { jwtDecode } from "jwt-decode";

export enum isAuthenticatedReturn {
    IS_AUTHENTICATED,
    IS_NOT_AUTHENTICATED,
    ACCESS_TOKEN_EXPIRED
}

export const useAuthService = {
    async login(authInfo:{email:string,password:string}) {
        return  await api.post('/login',authInfo)
    },
    async sendResetPasswordRequest(body:{email:string}){
        return await api.post('/password/reset',body)
    },
    async checkResetPasswordToken({token}:{token:string}){
        return await api.post(`/password/reset/check/${token}`,{})
    },
    async resetPassword(passwords:{password:string,conferm_password:string},token:string){
        return await api.post(`/password/reset/${token}`,passwords)
    },
    async verifyEmail({id,token}:{id:string,token:string}){
        console.log("VERIFICATING THE ACCOUNT USER")
       return api.get(`/email/verify/${id}/${token}`)
    },
    async resendVerifyEmail({id}:{id:string}){
        return api.post(`/email/resend/${id}`,{})
    },
    async refreshJWTToken(refresh:{refresh:string}){
        return api.post('/refresh',refresh)
    },
    isAuthenticated():isAuthenticatedReturn{
        const accessToken = localStorage.getItem(ACCESS_TOKEN)
        if(accessToken != null){
            const jwtExp = jwtDecode(accessToken).exp 
            if(Date.now() / 1000 > jwtExp!){
                // the access token is still valid
                return isAuthenticatedReturn.IS_AUTHENTICATED
            } else {
                // refresh the token
                return isAuthenticatedReturn.ACCESS_TOKEN_EXPIRED
            }
        } 
        // the access token is not available , the user is not loged in 
        return isAuthenticatedReturn.IS_NOT_AUTHENTICATED
    }
}
