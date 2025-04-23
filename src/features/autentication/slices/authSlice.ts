import { createSlice } from "@reduxjs/toolkit";
import { JWTInterface } from "../models/Jwt/JwtInterfaces";
import { clearJWT, setJWT } from "../utils/jwt/jwt";

interface AuthSliceInterface{
    isAuthenticated:boolean,
    jwt:JWTInterface|null,
}

const authSliceInitialState:AuthSliceInterface = {
    jwt:null,
    isAuthenticated:false,
}

const authSlice = createSlice({
    name:'auth',
    initialState:authSliceInitialState,
    reducers:{
        setSession:(state,action)=>{
            const jwt:JWTInterface = action.payload
            const done = setJWT(jwt)
            if(done){
                state.jwt = jwt
                state.isAuthenticated = true
            } else {
                state.jwt = null
                state.isAuthenticated = false
            }
            
            action.payload = done
            
        },
        clearSession:(state)=>{
            state.jwt = null
            state.isAuthenticated = false

            clearJWT()
        }
    }

})

export const authSliceActions = authSlice.actions
export const authReducer = authSlice.reducer