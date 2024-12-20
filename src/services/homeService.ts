import { api } from "./api"

export const useHomeService = {
    async getHomeStores(){
        return api.get('/home')   
    }
}