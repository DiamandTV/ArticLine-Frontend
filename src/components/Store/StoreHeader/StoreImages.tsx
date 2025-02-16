import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
//import { CardImage } from "../../cards/CardImage"
import { CarouselImages } from "../../Carousel/Carousel"
import { useEffect, useRef } from "react"

export function StoreImages(){
    const containerRef = useRef<HTMLDivElement>(null)

    const store = useSelector((state:RootState)=>state.storeReducer.store)
    useEffect(()=>{

    })
    return(
        store && store.images ?
        <div className="w-full col-span-2 " ref={containerRef}>
            <CarouselImages  images={store!.images} />
        </div>
        : null
    )
}