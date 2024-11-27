import api from "./api";

export const useAuthService = {
    async login(authInfo:{email:string,password:string}) {

    },
    async sendResetPasswordRequest(body:{email:string}){
        return await api.post('/password/reset',body)
    },
    async resetPassword({password,conferm_password}:{password:string,conferm_password:string}){

    },
    async verifyEmail({id,token}:{id:string,token:string}){
        console.log("VERIFICATING THE ACCOUNT USER")
       return api.get(`/email/verify/${id}/${token}`)
    },
    async resendVerifyEmail({id}:{id:string}){
        return api.post(`/email/resend/${id}`,{})

    }
}
