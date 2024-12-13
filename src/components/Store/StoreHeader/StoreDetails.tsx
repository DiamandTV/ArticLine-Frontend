import { useSelector } from "react-redux";
import { AddressModel } from "../../../models/address";
import { RootState } from "../../../store/store";
import { DescriptionCard } from "../../cards/DescriptionCard";
import { RatingCard } from "../../cards/RatingsCard";
const formatStreet = (address?:AddressModel)=>{
    if(!address) return "";
    return `${address.street} - ${address.city} ( ${address.postal_code} )`
}

const formatAddress = (address?:AddressModel)=>{
    if(!address) return "";
    return `${address.province} - ${address.country}`
}

export function StoreDetails(){
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    return(
        <div className="w-full h-full flex flex-col justify-center gap-y-4">
            <h1 className="text-5xl h-full font-medium ">{store?.title}</h1>
                <div>
                    <span className="block">{formatStreet(store?.address)}</span>
                    <span>{formatAddress(store!.address)}</span>
                </div>
                <DescriptionCard/>
                <RatingCard ratings={30} average_rating={20}/>
        </div>
    )
}