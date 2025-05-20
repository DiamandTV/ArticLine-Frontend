import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { JWTInterface } from "../models/Jwt/JwtInterfaces";
import { clearJWT, getJWT, isJWTValidate, setJWT } from "../utils/jwt/jwt";
import { ProfileInterface } from "../models/Profile/Interface/Type";
import { StoreAsyncThunkConfig } from "@store/store";
import { jwtServices } from "../services/jwtServices";
import { profileServices } from "../services/profileServices";

interface AuthSliceInterface{
    isAuthenticated:boolean,
    jwt:JWTInterface|null,
    profile:ProfileInterface,
    ability:unknown
}

const authSliceInitialState:AuthSliceInterface = {
    jwt:getJWT(),
    isAuthenticated:false,
    profile:null,
    ability:null
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
        },
        setProfile:(state,action)=>{
            console.log(action.payload)
            state.profile = action.payload
        },
        clearProfile:(state)=>{
            state.profile = null
        },
        setEntityAddress:(state,action)=>{
            const profile = {...state.profile,entity_address:action.payload}
            state.profile = profile as ProfileInterface
        }
    },

})

export const initSession = createAsyncThunk.withTypes<StoreAsyncThunkConfig>()(
    "authSlice/initSession",
    async(_,{getState,dispatch})=>{
        const store = getState()
        const jwt = store.authReducer.jwt
        
        console.log(jwt?.access)
        if(!jwt) {
            // todo: do something negative
            return null
        }
        if(!isJWTValidate(jwt)){
            return null
        }
    
        try{
            // get the profile
            return await dispatch(retrieveProfile()).unwrap()
            
        }catch(e){
            // if(e instanceof AxiosError){
            //     // auth token is expired or invalid
            //     const refreshed = await dispatch(refreshToken()).unwrap()
            //     if(refreshed){
            //         // auth token refreshed , now retreive the user profile
            //         try{
            //             return await dispatch(retrieveProfile()).unwrap()
            //         }catch(e){
            //             console.log(e)
            //             return null
            //         }
            //     } 
            // }    

            // ? not going to save the refresh the token because error interceptor gonna handle it
            console.log(e)
            
        }
        return null
    }
)

export const refreshToken = createAsyncThunk.withTypes<StoreAsyncThunkConfig>()(
    "authSlice/refreshToken",
    async(_,{getState,dispatch})=>{
        const store = getState()
        const jwt = store.authReducer.jwt
        
        if(!jwt) return null
        
        const refresh = jwt.refresh
        try{
            const response = await jwtServices.refresh(refresh)
            const data:{access:string} = response.data
            const access = data.access
            const jwt:JWTInterface = {
                access,
                refresh
            }
            // save the jwt in redux
            dispatch(
                (authSliceActions.setSession(jwt))
            )
            // 
            return jwt
        }catch(e){
            console.log(e)
        }

        // clear the jwt in redux
        await dispatch(
            authSliceActions.clearSession()
        )
        await dispatch(
            authSliceActions.clearProfile()
        )
        //
        return null
    }
)

export const retrieveProfile = createAsyncThunk.withTypes<StoreAsyncThunkConfig>()(
    'authSlice/retriveProfile',
    async(_,{dispatch})=>{
        const response = await profileServices.retrieve()
        const profile:ProfileInterface = response.data
        //alert(profile)
        // set the profile in redux
        await dispatch(
            authSliceActions.setProfile(profile)
        )
        //
        return profile
    }
)

export const authSliceActions = {...authSlice.actions,initSession,refreshToken}
export const authReducer = authSlice.reducer