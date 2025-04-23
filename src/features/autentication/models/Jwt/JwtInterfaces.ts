type JWTRefreshType = string
type JWTAccessType = string

export interface JWTInterface {
    access:JWTRefreshType ,
    refresh:JWTAccessType 
}