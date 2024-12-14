import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
//import { CardImage } from "../../cards/CardImage"
import { CarouselImages } from "../../Carousel/Carousel"

export function StoreImages(){
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    return(
        store && store.images ?
        <div className="w-full col-span-2">
            <CarouselImages images={store!.images}/>
        </div>
        : null
    )
}