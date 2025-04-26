import { ACCESS_TOKEN_STORAGE, REFRESH_TOKEN_STORAGE } from "@features/autentication/data/jwt";
import { JWTInterface } from "@features/autentication/models/Jwt/JwtInterfaces";
import { jwtDecode } from "jwt-decode";
function getAccessToken():string|null{
    return localStorage.getItem(ACCESS_TOKEN_STORAGE)
}

function getRefreshToken():string|null{
    return localStorage.getItem(REFRESH_TOKEN_STORAGE)
}

export function isJWTValidate(jwt:JWTInterface):boolean{
    const jwtExp = jwtDecode(jwt.access).exp
    if(jwtExp && Date.now() / 1000 < jwtExp) {
        return true
    }
    return false
}

export function getJWT():JWTInterface|null{
    const access = getAccessToken()
    const refresh = getRefreshToken()
    if(access && refresh){
        const jwt:JWTInterface = {access,refresh}
        if(isJWTValidate(jwt)) {  
            return jwt       
        }
        
    }
    return null
}


function setAccessToken(access:string){
    localStorage.setItem(ACCESS_TOKEN_STORAGE,access)
}

function setRefreshToken(refresh:string){
    localStorage.setItem(REFRESH_TOKEN_STORAGE,refresh)
}

export function setJWT(jwt:JWTInterface){
    if(isJWTValidate(jwt)){
        setAccessToken(jwt.access)
        setRefreshToken(jwt.refresh)
        return true
    }
    return false
}

function clearAccessToken(){
    localStorage.removeItem(ACCESS_TOKEN_STORAGE)
}

function clearRefreshToken(){
    localStorage.removeItem(REFRESH_TOKEN_STORAGE)
}

export function clearJWT(){
    clearAccessToken()
    clearRefreshToken()
}