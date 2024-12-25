import { NotificationModel } from "../models/notification"
import { api } from "./api"

export const useNotificationService = {
    async getNotifications(){
        return api.get('/notifications')
    },
    async deleteNotification({notification}:{notification:NotificationModel}){
        return api.delete(`/delete/notification/${notification.id}`)
    },
    async setNotificationReaden(){

    }
}