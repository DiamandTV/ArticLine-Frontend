// ArticLine authentication slice
import { createSlice } from "@reduxjs/toolkit";
import { AuthModel } from "../models/auth";
import { JWTModel } from "../models/jwt";
import { UserProfileModel } from "../models/user";
import { CompanyProfileModel } from "../models/company";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constraints";

export interface AuthSliceIntialValueProps {
    jwt:JWTModel | null,
    auth:AuthModel | null,
    profile:UserProfileModel | CompanyProfileModel | null,
    isAuthenticated:boolean | null,
}

console.log(localStorage.getItem(REFRESH_TOKEN))


const authSliceInitialValue:AuthSliceIntialValueProps = {
    jwt:{
        access:localStorage.getItem(ACCESS_TOKEN) ,
        refresh:localStorage.getItem(REFRESH_TOKEN) 
    },
    auth:null,
    profile:null,
    isAuthenticated:null,
}


const authSlice = createSlice({
    name:"authSlice",
    initialState:authSliceInitialValue,
    reducers:{
        setSession:(state,action)=>{
            state.jwt = action.payload.jwt
            state.profile = action.payload.profile
            state.auth = state.profile?.auth as AuthModel
            
            // saving the tokens , #todo: save them in cookies in future
            if(state.jwt && state.jwt.access && state.jwt.refresh){
                localStorage.setItem(ACCESS_TOKEN,state.jwt?.access)
                localStorage.setItem(REFRESH_TOKEN,state.jwt.refresh)
            }

            state.isAuthenticated = true
        },
        saveTokensInStorage:(state)=>{
            if(state.jwt && state.jwt.access && state.jwt.refresh){
                localStorage.setItem(ACCESS_TOKEN,state.jwt?.access)
                localStorage.setItem(REFRESH_TOKEN,state.jwt.refresh)
            }
        },
        setAuthenticated:(state,action)=>{
            state.isAuthenticated = action.payload
        },
        saveTokensInStore:(state,action)=>{
            state.jwt!.access = action.payload.access
            state.isAuthenticated = true
            
        }
    },
})

export const {setSession,setAuthenticated,saveTokensInStore} = authSlice.actions
export const authReducer = authSlice.reducer





