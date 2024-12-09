import { useContext, useEffect, useRef } from "react"
import { CarouselContext } from "./CarouselContext"

export function Slider(){
    const {children,scroll:{scroll}} = useContext(CarouselContext)
    const carouselRef = useRef<HTMLDivElement | null>(null)

    useEffect(()=>{
        if(carouselRef && carouselRef.current){
            carouselRef.current.scrollLeft += scroll
        }
    },[scroll])

    return(
        <div
            ref={carouselRef} 
            className="w-full h-full flex flex-row justify-start items-center overflow-hidden">
            {children}
        </div>
    )
}