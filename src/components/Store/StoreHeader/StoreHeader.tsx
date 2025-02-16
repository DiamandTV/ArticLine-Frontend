import { useSelector } from "react-redux";
import { BlurCard } from "../../Cards/BlurCard";
//import { CarouselImages } from "../Carousel/Carousel";
import { StoreDetails } from "./StoreDetails";
import { StoreImages } from "./StoreImages";
import { StoreSettings } from "./StoreSettings";
import { RootState } from "../../../store/store";


export function StoreHeader(){
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    return(
        store ? 
        <div className="w-full flex flex-col justify-center items-center md:grid md:grid-cols-5 md:items-stretch gap-x-2 lg:gap-x-8 gap-y-4">
            <StoreImages/>
            <BlurCard className=" col-span-3 h-full flex flex-col sm:flex-row gap-y-4 px-4 lg:px-8 gap-x-2">
                <StoreDetails/>
                <StoreSettings/>
            </BlurCard>
        </div>  : null  
    )
}

{/* /*
<BlurCard className="w-full h-full grid grid-cols-5">
    <div className="col-span-2 h-36">
        <CarouselImages images={store!.images}/>
    </div>
</BlurCard>
*/  }