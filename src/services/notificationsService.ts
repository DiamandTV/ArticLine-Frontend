import { NotificationModel } from "../models/notification"
import { api } from "./api"

export const useNotificationService = {
    async getNotifications(data:{pageParam:number}){
        console.log(data)
        return api.get(`/notifications/?page=${data.pageParam}`)
    },
    async deleteNotification({notification}:{notification:NotificationModel}){
        return api.delete(`/delete/notification/${notification.id}`)
    },
    async setNotificationReaden(ids:Array<number>){
        return api.put('/notifications/set_readen',{ids})
    }
}