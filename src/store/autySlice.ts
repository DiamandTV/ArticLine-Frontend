// ArticLine authentication slice
import api from "../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthModel } from "../models/auth";
import { UserProfileModel } from "../models/user";
import { AxiosError } from "axios";
import { string } from "zod";
import { JWTModel } from "../models/jwt";
import { UserProfileModel } from "../models/user";
import { CompanyProfileModel } from "../models/company";
import { jwtDecode } from "jwt-decode"

export interface AuthSliceIntialValueProps {
    jwt:JWTModel | null,
    auth:AuthModel | null,
    profile:UserProfileModel | CompanyProfileModel | null,
    isAuthenticated:boolean,
}

const authSliceInitialValue:AuthSliceIntialValueProps = {
    jwt:null,
    auth:null,
    profile:null,
    isAuthenticated:false,
}


const authSlice = createSlice({
    name:"authSlice",
    initialState:authSliceInitialValue,
    reducers:{
        setSessioin:(state,action)=>{
            state.profile = action.payload.profile
            state.auth = state.profile?.auth as AuthModel
            
            // saving the tokens , #todo: save them in cookies in future
            if(state.jwt && state.jwt.access && state.jwt.refresh){
                localStorage.setItem(ACCESS_TOKEN,state.jwt?.access)
                localStorage.setItem(REFRESH_TOKEN,state.jwt.refresh)
            }
        },
        saveTokens:(state,actions)=>{
            if(state.jwt && state.jwt.access && state.jwt.refresh){
                localStorage.setItem(ACCESS_TOKEN,state.jwt?.access)
                localStorage.setItem(REFRESH_TOKEN,state.jwt.refresh)
            }
        }
        isAuthenticated:(state,action)=>{
            
        }
    },
})





