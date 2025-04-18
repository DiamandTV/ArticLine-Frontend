import { CoordinateInterface } from "../../Coordinate/CoordinateInterface";
export interface AddressInterface{
    id:number,
    recipient_name:string,
    street:string,
    city:string,
    province:string,
    postal_code:string,
    country:string,
    coordinate:CoordinateInterface
}

export type AddressRequestInterface = string