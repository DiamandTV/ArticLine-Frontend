// ArticLine authentication slice
import api from "../services/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthModel } from "../models/auth";
import { useUserService } from "../services/userService";
import { UserProfileModel } from "../models/user";
import { CompanyProfileModel } from "../models/company";
import { AxiosError } from "axios";

export interface AuthSliceIntialValueProps {
    auth:AuthModel | null,
    profile:UserProfileModel | null

}

const authSliceInitialValue:AuthSliceIntialValueProps = {
    auth:null,
    profile:null
}

const authSlice = createSlice({
    name:"authSlice",
    initialState:authSliceInitialValue,
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(userSignIn.fulfilled,(state,action)=>{
        
        }).addCase(userSignIn.rejected,(state,action)=>{

        })
    },
})

export const userSignIn = createAsyncThunk("authSlice/signin",async(userProfile:UserProfileModel,{rejectWithValue})=>{
    try{
        const data = await api.post('/user/signin',userProfile)
        return data
    }catch(error){
        if(error instanceof AxiosError){
            rejectWithValue(error.message)
        }
        
    }
})




