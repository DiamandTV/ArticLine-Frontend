import { CoordinateInterface } from "../../Coordinate/CoordinateInterface";
export interface AddressInterface{
    id:number,
    full_address:string,
    coordinate:CoordinateInterface
}

export type AddressRequestInterface = Omit<AddressInterface,'id'|'coordinate'>