import { HOST_URL } from "@data/server";
import { toast, } from 'react-toastify';
import axios, { AxiosError } from "axios";
import { ServerErrorsAndTypeInterface } from "@models/ApiResponse/ErrorResponse/ServerErrorResponseInterface";
import { Alert } from "react-bootstrap";

export const api = axios.create({
    baseURL:HOST_URL
})

api.interceptors.response.use(
    // ? SUCCESS
    // (/*respone:AxiosResponse<any,any>*/):AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>=>{

    // },
    null,
    // ? ERROR
    (error:AxiosError)=>{
        console.log(error)
        if(error.response){
            const statusCode = error.response.status
            const errorDetail = error.response.data as ServerErrorsAndTypeInterface
            if(statusCode === 401){
                // HANDLE UNAUTHORIZED ERRORS
                // todo: remove to login
            }
            
            if(errorDetail.type === 'server_error'){         
                toast(
                    <Alert variant="danger">
                        SOMETHING WENT WRONG
                    </Alert>
                )
            }
        } else if (error.request){
            //  NO RESPONSE RECEIVED (NETWORK ERROR, TIMEOUT , ETC...)
            toast(
                <Alert variant="danger">
                    NETWROK ISSUE
                </Alert>
            )
        }
        else{
            toast(
                <Alert variant="danger">
                    SOMETHING WENT WRONG
                </Alert>
            )
        }
        return Promise.reject(error)
    }
)