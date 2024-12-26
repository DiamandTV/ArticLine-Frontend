import { CourierProfileModel } from "../models/Courier"
import { api } from "./api"

export const useCourierService = {
    async courierSignIn(courierProfile:CourierProfileModel){
        // deleting the access token and the refresh token if the user decided to sign in
        console.log(courierProfile.auth)
        const data = await api.post('/courier/signin/',courierProfile)
        return data 
    },
}