import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:8000"
})

api.interceptors.request.use((config)=>{
        const accessKey = localStorage.getItem(import.meta.env.ACCESS_TOKEN)
        if(accessKey){
            config.headers.Authorization = `Bearer ${accessKey}po`
        }
        return config
    },
    (error)=>Promise.reject(error)
)
export default api