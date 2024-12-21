import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "../services/authService";
import { isAuthenticatedReturn } from "../services/authService";
import { LoaderResponse } from "../components/Loader/LoaderResponse";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setAuthenticated, setSession } from "../store/authSlice";
import { PermissionView } from "./PermissionView";
import { setCategories } from "../store/categorySlice";
import { companyStoreService } from "../services/companyStoreService";
import { setProfile } from "../store/profileSlice";
import { StartView } from "../views/StartView";
import { NotifierView } from "./NotifierView";
import { SSEProvider } from "react-hooks-sse";

// Protected route for the main pages 
export function ProtectedRoute({redirectTo='/login'}:{redirectTo?:string}){
    const isAuthenticated = useSelector((state:RootState)=>state.authReducer.isAuthenticated)
    const REFRESH_TOKEN = useSelector((state:RootState)=>state.authReducer.jwt?.refresh)
    const ACCESS_TOKEN = useSelector((state:RootState)=>state.authReducer.jwt?.access)
    const auth = useSelector((state:RootState)=>state.authReducer.auth)
    const dispatch = useDispatch()
    const {isLoading,isSuccess,isError, mutate } = useMutation({
        mutationKey:['auth-refresh-jwt-token'],
        mutationFn:async(refresh:{refresh:string})=> await useAuthService.refreshJWTToken(refresh),
        onError:()=>{
            dispatch(setAuthenticated(false))
        }, 
        onSuccess:async (data)=>{
            console.log(data)
            console.log(data.data)
            // saving the JWT tokens in the store and setting the authenticated 
            dispatch(setSession(data.data))
            dispatch(setProfile(data.data))
            dispatch(setCategories((await companyStoreService.getCategories()).data))


        }
    })
    useEffect(()=>{
            
            // checking if the user has got the JWT Token
            const isAuthenticatedReponse = useAuthService.isAuthenticated(ACCESS_TOKEN as string | null)
            console.log(REFRESH_TOKEN)
            switch(isAuthenticatedReponse){
                case isAuthenticatedReturn.IS_AUTHENTICATED:
                    //dispatch(setAuthenticated(true))
                    mutate({refresh:REFRESH_TOKEN!})
                    break;
                case isAuthenticatedReturn.IS_NOT_AUTHENTICATED:
                    //dispatch(setAuthenticated(false))
                    mutate({refresh:REFRESH_TOKEN!})
                    break;
                case isAuthenticatedReturn.ACCESS_TOKEN_EXPIRED:
                    if(REFRESH_TOKEN) mutate({refresh:REFRESH_TOKEN})
                    else dispatch(setAuthenticated(false))
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
        isLoading || isAuthenticated == null ?
            <StartView>
                <LoaderResponse
                    isLoading={isLoading || isAuthenticated == null}
                    isError={isError}
                    isSuccess={isSuccess}
                    messages={{
                        error:"",
                        warning:"",
                        success:""
                    }}
                    redirect={false}
                />
            </StartView>
            :
            !isAuthenticated ? 
            <Navigate to={redirectTo}/>
            :
            isAuthenticated ?
            (
                <PermissionView>
                        <NotifierView>
                            <Outlet/>
                        </NotifierView>
                </PermissionView>)
            : null
        
    )
}