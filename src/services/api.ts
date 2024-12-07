import axios from "axios"
import { ACCESS_TOKEN } from "../constraints"

const api = axios.create({
    baseURL:"http://localhost:8000"
})

api.interceptors.request.use((config)=>{
        const accessKey = localStorage.getItem(ACCESS_TOKEN)
        console.log(accessKey)
        if(accessKey){
            config.headers.Authorization = `Bearer ${accessKey}`
        }
        config.headers["Content-Type"] = "multipart/form-data"
        return config
    },
    (error)=>Promise.reject(error)
)
export default api