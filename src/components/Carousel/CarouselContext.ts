import { createContext } from "react";

export interface CarouselContextModel{
    children:React.ReactNode,
    scroll:{
        scroll:number,
        setScroll:(scroll:number)=>void
    }
}   

export const CarouselContext = createContext<Partial<CarouselContextModel>>({})