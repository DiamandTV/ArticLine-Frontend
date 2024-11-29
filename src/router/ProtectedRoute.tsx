import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "../services/authService";
import { isAuthenticatedReturn } from "../services/authService";

// Protected route for the main pages 
export function ProtectedRoute({children}:{children:React.ReactNode}){
    const {isLoading,mutate } = useMutation({
        mutationKey:['auth-refresh-jwt-token'],
        mutationFn:async(refresh:{refresh:string})=> await useAuthService.refreshJWTToken(refresh),
        onError:(err)=>{

        }, 
        onSuccess:(data)=>{

        }
    })
    useEffect(()=>{
            // checking if the user has got the JWT Token
            const isAuthenticatedReponse = useAuthService.isAuthenticated()
            switch(isAuthenticatedReponse){
                case isAuthenticatedReturn.IS_AUTHENTICATED:
                    
                    break;
                case isAuthenticatedReturn.IS_NOT_AUTHENTICATED:
                    break;
                case isAuthenticatedReturn.ACCESS_TOKEN_EXPIRED:
                    
                    mutate()
                    break;   
        }
    },[])
}