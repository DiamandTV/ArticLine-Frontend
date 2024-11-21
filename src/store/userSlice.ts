// ArticLine authentication slice

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthModel } from "../models/auth";
import { useUserService } from "../services/userService";
import { UserProfileModel } from "../models/user";
import { CompanyProfileModel } from "../models/company";

export interface AuthSliceIntialValueProps {
    auth:AuthModel | null,
    service:ReturnType<typeof UserService>,
    profile:UserProfileModel | null

}

const authSliceInitialValue:AuthSliceIntialValueProps = {
    auth:null,
    service:UserService(),
    profile:null
}

const authSlice = createSlice({
    name:"authSlice",
    initialState:authSliceInitialValue,
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(userSignIn.fulfilled,(state,action)=>{
            
        })
    },
})

export const userSignIn = createAsyncThunk("authSlice/signin",async(userProfile:UserProfileModel)=>{
    return await useUserService.userSignin(userProfile)
})




