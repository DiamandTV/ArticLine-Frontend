import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "../services/authService";
import { isAuthenticatedReturn } from "../services/authService";
import { LoaderResponse } from "../components/loader/LoaderResponse";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setAuthenticated,saveTokensInStore } from "../store/authSlice";

// Protected route for the main pages 
export function ProtectedRoute({children,redirectTo}:{children:React.ReactNode,redirectTo:string}){
    const isAuthenticated = useSelector((state:RootState)=>state.authReducer.isAuthenticated)
    const REFRESH_TOKEN = useSelector((state:RootState)=>state.authReducer.jwt?.refresh)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoading,isSuccess,isError, mutate } = useMutation({
        mutationKey:['auth-refresh-jwt-token'],
        mutationFn:async(refresh:{refresh:string})=> await useAuthService.refreshJWTToken(refresh),
        onError:(err)=>{
            dispatch(setAuthenticated(false))
        }, 
        onSuccess:(data)=>{
            dispatch(saveTokensInStore(data))
        }
    })
    useEffect(()=>{
            // checking if the user has got the JWT Token
            const isAuthenticatedReponse = useAuthService.isAuthenticated()
            switch(isAuthenticatedReponse){
                case isAuthenticatedReturn.IS_AUTHENTICATED:
                    dispatch(setAuthenticated(true))
                    break;
                case isAuthenticatedReturn.IS_NOT_AUTHENTICATED:
                    dispatch(setAuthenticated(false))
                    break;
                case isAuthenticatedReturn.ACCESS_TOKEN_EXPIRED:
                    if(REFRESH_TOKEN) mutate({refresh:REFRESH_TOKEN})
                    dispatch(setAuthenticated(false))
                    break;   
        }
    },[])

    /*
        if isLoading : <LoaderReponse/>
        else if isError : navigate to the redirect
        else if isSuccess : <>children</> 
        else : null
    */
    return (
        isLoading ?
            <LoaderResponse
                isLoading={isLoading}
                isError={isError}
                isSuccess={isSuccess}
                messages={{
                    error:"",
                    warning:"",
                    success:""
                }}
                redirect={false}
            />
            :
            !isAuthenticated ? 
            navigate(redirectTo)
            :
            isAuthenticated ?
            <>{children}</>
            : null
        
    )
}