import {  useEffect, useRef } from "react";
import { StoreModel } from "../../models/store"
import { FaStar } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useContext } from "react";
import { CardListContext } from "../CardList/CardListContext";
import { FaHeart } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
export interface StoreCardProps extends React.HTMLAttributes<HTMLAllCollection>{
    store:StoreModel,
    style?:React.CSSProperties,
}

export function StoreCard({store:{title,images,average_rating,ratings,views},style,className}:StoreCardProps){
    const {card:{setCardHeight}} = useContext(CardListContext)
    const divRef = useRef<HTMLDivElement | null>(null)

    useEffect(()=>{
        console.log(divRef.current!.scrollHeight)
        setCardHeight(divRef.current!.scrollHeight)
    })

    return (
        <div className={`w-full h-full rounded-xl ${className}}`} style={style} ref={divRef}>
            {/* IMAGES OF THE STORE CARD. MAX 5 IMAGES ARE SUPPORTED*/}
            <div className="w-full h-60 bg-transparent bg-no-repeat bg-center bg-cover rounded-t-lg" style={{backgroundImage:`url(${images[0]})`}}>
                <div className="w-full flex flex-row justify-between items-center px-2 py-2">
                    <FaHeart size={20}/>
                    <IoMenu size={22}/>
                </div>
            </div>
            <div className="w-full  flex flex-row justify-center items-center p-2 bg-slate-300  bg-opacity-30 backdrop-blur-lg rounded-b-lg">
                <div className="w-full flex flex-col py-2 gap-y-0 ">
                    <p className="text-xl font-bold">{title}</p>

                </div>
                <div className="h-full flex flex-row justify-center items-center gap-4 ">
                    <div className="flex flex-col justify-center items-center">
                        <FaEye size={17.5}/>
                        <i>{views}</i>
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                        <FaComments size={17.5}/>
                        <i>{ratings}</i>
                    </div>
                </div>
            </div>
        </div>
    )
   
}


/*
export const StoreCardRef = forwardRef<HTMLDivElement,StoreCardProps>(({store:{title,images,average_rating,ratings,views},style,className},ref)=>{
    useEffect(()=>{
        console.log(ref.current.offsetHeight)
    },[])
    return (
        <div className={`w-full ${className}}`} style={style} ref={ref}>
            
            <div className="w-full h-60 bg-transparent bg-no-repeat bg-center bg-cover rounded-t-lg" style={{backgroundImage:`url(${images[0]})`}}>
            </div>
            <div className="w-full flex flex-row justify-center items-center p-2 bg-slate-300  bg-opacity-30 backdrop-blur-lg rounded-b-lg">
                <div className="w-full flex flex-col py-2 gap-y-0 ">
                    <p className="text-xl font-bold">{title}</p>
                    <div className="flex flex-row justify-start items-center gap-x-1">
                        <FaStar size={15}/>
                        <span>{average_rating} BUONO ({ratings})</span>
                    </div>
                </div>
                <div className="h-full flex flex-row justify-center items-center gap-4 ">
                    <div className="flex flex-col justify-center items-center">
                        <FaEye size={17.5}/>
                        <i>{views}</i>
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                        <FaComments size={17.5}/>
                        <i>{ratings}</i>
                    </div>
                </div>
            </div>
        </div>
    )
})
*/