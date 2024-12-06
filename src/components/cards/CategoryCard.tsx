import { useContext, useEffect, useRef } from "react"
import { CategoryModel } from "../../models/category"
import { CardListContext } from "../CardList/CardListContext"
export interface CategoryCardProps extends React.HTMLAttributes<HTMLAllCollection>{
    category:CategoryModel
}

export function CategoryCard({category:{image,name},style,className}:CategoryCardProps){
    const {card:{setCardHeight}} = useContext(CardListContext)
    const divRef = useRef<HTMLDivElement | null>(null)
    useEffect(()=>{
        setCardHeight(divRef.current!.scrollHeight)
    })
    return (
        <div className={`w-full h-full min-h-1 hover:cursor-pointer ${className} rounded-xl`} style={{...style}} ref={divRef}>
            {/* IMAGE OF THE CATEFORY CARD */}
            {/*
            <div className="w-full h-32 bg-transparent bg-no-repeat bg-center bg-cover rounded-t-lg" style={{backgroundImage:`url(${image})`}}>
            </div>
            */}
            <img className="w-full h-30 bg-transparent bg-no-repeat bg-center bg-contain rounded-t-lg" src={image} loading="lazy"/>
            <p className=" px-2 py-3 text-center text-lg bg-slate-300 bg-opacity-30 backdrop-blur-lg rounded-b-lg">{name.toUpperCase()}</p>
        </div>
    )
}