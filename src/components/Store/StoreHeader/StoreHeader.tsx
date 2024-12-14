import { BlurCard } from "../../cards/BlurCard";
//import { CarouselImages } from "../Carousel/Carousel";
import { StoreDetails } from "./StoreDetails";
import { StoreImages } from "./StoreImages";
import { StoreSettings } from "./StoreSettings";


export function StoreHeader(){
    
    return(
        <div className="w-full grid grid-cols-5 gap-x-8 items-stretch">
            <StoreImages/>
            <BlurCard className=" col-span-3 h-full flex flex-row gap-y-4">
                <StoreDetails/>
                <StoreSettings/>
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