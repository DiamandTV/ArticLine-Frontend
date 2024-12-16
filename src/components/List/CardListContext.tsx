import { createContext } from "react";

export interface CardListContextProps{
    card:{
        cardHeight:number
        setCardHeight:(height:number)=>void,
    }
}

export const CardListContext = createContext<CardListContextProps>({
    card:{
        cardHeight:0,
        setCardHeight:()=>{}
    }
})
