
import { CategoryModel } from "../../models/category"
import { CategoryCard } from "../Cards/CategoryCard"
import { useEffect, useRef } from "react"
export interface CategoryCardListProps {
    length:number,
    size:{
        width:number|string,
        height:number|string
    },
    itemSize:number,
    categoriesList:Array<CategoryModel>
}
/*
export function CategoryCardList({length,size:{height,width},itemSize,categoriesList}:CategoryCardListProps){
    const divRef = useRef<HTMLDivElement | null>(null)
    return (
        <div className="w-full">
            <FixedSizeList
                className="scrollbar-hide w-full flex"
                innerElementType={'div'}
                itemCount={length}
                itemSize={itemSize}
                height={height}
                width={width}
                layout="horizontal"
            >
                {({index,style})=><CategoryCard
                    style={style}
                    category={categoriesList[index]}
                />}
            </FixedSizeList>
        </div>
    )
}
*/

export function CardList({length,size:{height,width},itemSize,categoriesList}:CategoryCardListProps){
    const divRef = useRef<HTMLDivElement | null>(null)
    const onScroll = (e)=>{
        e.preventDefault()
        if(e.deltaY == 0) return;
        divRef.current?.scrollTo({
            left:divRef.current.scrollLeft + e.deltaY*2,
            behavior:'smooth'
        })

    }
    useEffect(()=>{
        if(divRef){
            divRef.current?.addEventListener('wheel',onScroll)
            return ()=>removeEventListener('wheel',onScroll)
        }
    })

    return (
        <div className="w-full h-48 relative overflow-hidden" >
            <div className="w-full absolute flex flex-row flex-nowrap gap-x-2 scrollbar-hide overflow-auto " 
            ref={divRef}>
                {categoriesList.map((category)=><CategoryCard
                    category={category}
                    style={{
                        flex: `0 0 ${itemSize}px`, // Fissa la larghezza del figlio
                        width: `${itemSize}px`,    // Aggiunge ridondanza per sicurezza
                    }}

                />)}

            </div>

        </div>
    )
}