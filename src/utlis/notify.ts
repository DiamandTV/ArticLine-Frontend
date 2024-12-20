import { AxiosError } from "axios";
import { toast } from "react-toastify";
export function notifyCheck(error:unknown){
    if (error instanceof AxiosError && error.response?.data){
        notify(error.response.data)
    }   
}

export function notify(message:unknown){
    if(Array.isArray(notify)){
        (message as Array<unknown>).map((message)=>{
            _handeMessage(message)
        })
    }else{
        _handeMessage(message)
    }

}

function _handeMessage(message:unknown){
    if (message && typeof message === "object"){
        Object.entries(message).forEach(([key,value])=>{
            _handleNotification(key,value)
        })
    }
}

function _handleNotification(key:unknown,value:unknown){
    switch (key){
        case 'success':
            toast.success((value as string).toUpperCase(), {
                position: "top-right"
            });
            break;
        case 'warning':
            toast.warning((value as string).toUpperCase(), {
                position: "top-right"
            });
            break;
        case 'error':
            
            toast.error((value as string).toUpperCase(), {
                position: "top-right"
            });
            break;
    }
}