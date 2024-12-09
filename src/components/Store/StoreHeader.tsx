import { useSelector } from "react-redux";
import { BlurCard } from "../cards/BlurCard";
import { RootState } from "../../store/store";
//import { CarouselImages } from "../Carousel/Carousel";
import { CardImage } from "../cards/CardImage";
import { AddressModel } from "../../models/address";
import { RatingCard } from "../cards/RatingsCard";
import { DescriptionCard } from "../cards/DescriptionCard";
import { CategoryCardList } from "../CardList/CategoryList";
import { Tab, Tabs } from "@mui/material";

const formatStreet = (address:AddressModel)=>{
    return `${address.street} - ${address.city} ( ${address.postal_code} )`
}

const formatAddress = (address:AddressModel)=>{
    return `${address.province} - ${address.country}`
}

export function StoreHeader(){
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    return(
        <div className="w-full grid grid-cols-5 gap-x-8">
            <CardImage image={store!.images[0].image!} className="col-span-2 h-72 rounded-xl" />
            <BlurCard className="col-span-3 h-full flex flex-col gap-y-4">
                <h1 className="text-5xl h-full font-medium ">{store?.title}</h1>
                <div>
                    <span className="block">{formatStreet(store!.address)}</span>
                    <span>{formatAddress(store!.address)}</span>
                </div>
                <DescriptionCard/>
                <RatingCard ratings={30} average_rating={20}/>
            </BlurCard>
        </div>    
    )
}

{/* /*
<BlurCard className="w-full h-full grid grid-cols-5">
    <div className="col-span-2 h-36">
        <CarouselImages images={store!.images}/>
    </div>
</BlurCard>
*/  }