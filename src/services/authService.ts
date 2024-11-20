import api from "./api";

export const useAuthService = {
    async login(authInfo:{email:string,password:string}) {

    },
    async sendResetPasswordRequest({email}:{email:string}){

    },
    async resetPassword({password,conferm_password}:{password:string,conferm_password:string}){

    },
    async verifyEmail({id,token}:{id:number,token:string}){

    },
    async sendVerifyEmail({email}:{email:string}){

    }
}
