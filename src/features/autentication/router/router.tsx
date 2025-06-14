import  { FeatureRoutes, RouteGroup } from "@models/routes/routes"
import { UserSigninPage } from "../pages/signin/UserSigninPage"
import { LoginPage } from "../pages/login/Login"
import { SelectProfileTypePage } from "../pages/selectProfileType/SelectProfileType"
import { CourierSigninPage } from "../pages/signin/CourierSigninPage"
import { CompanySigninPage } from "../pages/signin/CompanySigninPage"
import { PasswordResetRequestPage } from "../pages/passwordReset/PasswordResetRequestPage"
import { PasswordResetPage } from "../pages/passwordReset/PasswordResetPage"
import { PasswordResetRequestSendedStatusPage } from "../pages/passwordReset/PasswordResetRequestSendedPage"
import { PasswordResetStatusPage } from "../pages/passwordReset/PasswordResetStatusPage"
import { AuthVerificationStatusPage } from "../pages/authVerifiication/AuthVerificationStatusPage"
import { SigninDone } from "../pages/signin/SigninDone"
import {  verificationServices } from "../services/verificationService"
import { VerificationResponseMapStatusType, VerificationResponseStatus, VerificationResponseType } from "../models/VerificationResponse/VerificationResponse"
import { AxiosError } from "axios"
import { AuthVerificationResendStatusPage } from "../pages/authVerifiication/AuthVerificationResendStatusPage"
import { passwordResetServices } from "../services/passwordResetServices"
import { PasswordResetCheckResponseMapStatusType, PasswordResetCheckResponseStatus, PasswordResetCheckResponseType } from "../models/PasswordResetResponse/PasswordResetCheckResponse"
import { decodeServerPayloadMsg } from "../../../utils/serverErrorDecode/errorDecode"
import { AccountPage, InternAccountPage } from "../pages/account/AccountPage"

const _protected:RouteGroup = {
    routesWithLayout:[
        {
            path:'/account/',
            element:<AccountPage/>,
            children:[
                {
                    path:':tab/',
                    element:<InternAccountPage/>
                }
            ]
        }
    ],
    standaloneRoutes:[]
}

const _public:RouteGroup = {
    routesWithLayout:[],
    standaloneRoutes:[
        {
            path:"select/signin/",
            element:<SelectProfileTypePage/>
        },
        {
            path:"user/signin/",
            element:<UserSigninPage/>
        },
        {
            path:"courier/signin/",
            element:<CourierSigninPage/>
        },
        {
            path:"company/signin/",
            element:<CompanySigninPage/>
        },
        {
            path:"signin/done/",
            element:<SigninDone/>
        },

        {
            path:"login/",
            element:<LoginPage/>
        },
        {
            path:"email/verification/:id/:token/",
            element:<AuthVerificationStatusPage/>,
            loader: async({params})=>{
                // todo: verify the code
                const profileID:string|undefined = params.id
                const token:string|undefined = params.token
                if(profileID && token){
                    try{
                        const response = await verificationServices.verification(profileID,token)
                        if(response.status === 200){
                            return VerificationResponseStatus.VERIFIED
                        } else{
                            return VerificationResponseStatus.ALREADY_VERIFIED
                        }
                    }catch(error){
                        
                        if(error instanceof AxiosError){
                            const messages = decodeServerPayloadMsg(error)
                            if(messages.length > 0){
                                for(let ii=0;ii<messages.length;ii++){   
                                    const msg = messages[ii]
                                    if(Object.keys(VerificationResponseMapStatusType).includes(msg)){
                                        console.log(VerificationResponseMapStatusType[msg as VerificationResponseType])
                                        
                                        return VerificationResponseMapStatusType[msg as VerificationResponseType]
                                    }
                                }
                            }
                        }
                        
                    }
                }
                return VerificationResponseStatus.BAD_REQUEST
            },
            
        },
        {
            path:'email/verification/:id/status/',
            element:<AuthVerificationResendStatusPage/>
        },

        {
            path:"password/reset/",
            element:<PasswordResetRequestPage/>
        },
        {
            path:"password/reset-sended/status/",
            element:<PasswordResetRequestSendedStatusPage/>
        },

        {
            path:"password/reset/:token/",
            element:<PasswordResetPage/>,
            loader:async({params})=>{
                const token = params['token']
                if(token){
                    try{    
                        await passwordResetServices.passwordResetCheckToken(token)
                        return PasswordResetCheckResponseStatus.TOKEN_VERIFIED
                    }catch(error){
                        console.log(error)
                        if(error instanceof AxiosError){
                            const messages = decodeServerPayloadMsg(error)
                            if(messages.length > 0 && Object.keys(VerificationResponseMapStatusType).includes(messages[0])){
                                const message = messages[0] as PasswordResetCheckResponseType
                                return PasswordResetCheckResponseMapStatusType[message]
                            }
                        }
                    }
                }
            }
        },
        {
            path:"password/reset/status/",
            element:<PasswordResetStatusPage/>
        }
    ]
}

export const autenticationFeatureRoutes:FeatureRoutes  =  {
    protected:_protected,
    public:_public
} 

