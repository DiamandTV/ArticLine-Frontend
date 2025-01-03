export interface AuthModel {
    id?:number,
    email:string,
    password:string,
    phone_number:string,
    is_verified?:boolean,
    is_superuser?:boolean, 
    type?:'USER' | 'COMPANY' | 'COURIER'
}