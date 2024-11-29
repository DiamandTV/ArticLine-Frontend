// JWT model of the data i'm going to receive from django backend
export interface JWTModel{
    access:string | null,
    refresh:string | null
}