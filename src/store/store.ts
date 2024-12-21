import { configureStore } from "@reduxjs/toolkit"
import { authReducer } from "./authSlice"
import { categoryReducer } from "./categorySlice"
import { profileReducer } from "./profileSlice"
import { storeReducer } from "./storeSlice"
import { cartsReducer } from "./cartsSlice"
import { orderReducer } from "./orderSlice"
import { homeReducer } from "./homeSlice"
import { notificationsReducer } from "./notificationsSlice"
export const store = configureStore({
    reducer:{
        authReducer:authReducer,            // authentication reducer       =>  jwt || auth
        profileReduce:profileReducer,       // profile reducer              =>  profile
        categoryReducer:categoryReducer,    // store categories reducer     =>  categories
        storeReducer:storeReducer,          // store details reducer        =>  store || categories || sub categories || products  
        cartsReducer:cartsReducer,          // store carts reducer          =>  carts
        orderReducer:orderReducer,          // profile orders               =>  orders
        homeReducer:homeReducer,            // home stores reducer          =>  home
        notificationsReducer:   
        notificationsReducer                // notifications reducer        =>  notifications             
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch