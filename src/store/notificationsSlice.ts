import { createSlice } from "@reduxjs/toolkit";
import { NotificationModel } from "../models/notification";
// slice used to fetch first first notifications
interface NotificationsSliceModel{
    notifications:Array<NotificationModel>
}

const notificationsSliceInitialValue:NotificationsSliceModel = {
    notifications:[]
}

const notificationsSlice = createSlice({
    name:'notifications',
    initialState:notificationsSliceInitialValue,
    reducers:{
        setNotifications:(state,action)=>{

        },
        addNotification:(state,action)=>{

        },
        deleteNotification:(state,action)=>{

        }
    },
})

export const {setNotifications,addNotification,deleteNotification} = notificationsSlice.actions
export const notificationsReducer = notificationsSlice.reducer