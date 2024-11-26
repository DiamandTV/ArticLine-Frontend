import api from "./api";

export const useAuthService = {
    async login(authInfo:{email:string,password:string}) {

    },
    async sendResetPasswordRequest({email}:{email:string}){

    },
    async resetPassword({password,conferm_password}:{password:string,conferm_password:string}){

    },
    async verifyEmail({id,token}:{id:string,token:string}){
        console.log("VERIFICATING THE ACCOUNT USER")
       return api.get(`/email/verify/${id}/${token}`)
    },
    async sendVerifyEmail({email}:{email:string}){

    }
}
