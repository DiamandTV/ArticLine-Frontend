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
            state.notifications = [...action.payload]
        },
        addNotification:(state,action)=>{
            state.notifications = [action.payload,...state.notifications]
        },
        deleteNotification:(state,action)=>{
            const notificationToDelete = action.payload as NotificationModel
            state.notifications = [...state.notifications.filter((notification)=>notification.id!==notificationToDelete.id)]
        }
    },
})

export const {setNotifications,addNotification,deleteNotification} = notificationsSlice.actions
export const notificationsReducer = notificationsSlice.reducer