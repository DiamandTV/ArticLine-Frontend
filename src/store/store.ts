import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./authSlice"
import { categoryReducer } from "./categorySlice"
import { profileReducer } from "./profileSlice"
import { storeReducer } from "./storeSlice"
export const store = configureStore({
    reducer:{
        authReducer:authReducer,            // authentication reducer       =>  jwt || auth
        profileReduce:profileReducer,       // profile reducer              =>  profile
        categoryReducer:categoryReducer,    // store categories reducer     =>  categories
        storeReducer:storeReducer           // store details reducer        =>  store || categories || sub categories || products  
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch