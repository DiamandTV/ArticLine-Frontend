import api from "../api";
import { UserProfileModel } from "../../models/user";
import { CompanyProfileModel } from "../../models/company";

export function AuthService(){
    return {
        async login(authInfo:{email:string,password:string}) {
            const response  = {
                'access':null,
                'error':null
            }
            try{
                await api.post('/login',authInfo)   
            }catch(e){
                
            }
        },
        async userSigin(userProfile:UserProfileModel){

        },
        async companySignin(companyProfile:CompanyProfileModel){

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
}