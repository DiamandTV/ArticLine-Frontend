import { ComponentType, useEffect, useRef, useState } from "react"

import { CardListContext } from "./CardListContext";
import { FixedSizeList, ListChildComponentProps } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer";
export interface CardListProps extends React.HTMLAttributes<HTMLAllCollection>{
    itemSize:number,
    itemCount:number
    children:ComponentType<ListChildComponentProps>
}

export function CartList({itemSize,itemCount,children,className}:CardListProps){
    const [cardHeight,setCardHeight] = useState(0)
    const divRef = useRef<HTMLDivElement | null>(null)
    const listRef = useRef<FixedSizeList | null>(null)
    const scrollWidth = useRef(0)
    
    const onScroll = (e)=>{
        e.preventDefault()
        if(e.deltaY == 0) return;
        
        //console.log(scrollWidth.current,listRef.current!.props.itemSize * listRef.current!.props.itemCount-1  - divRef.current!.offsetWidth)
        if(e.deltaY > 0 && scrollWidth.current < (listRef.current!.props.itemSize * listRef.current!.props.itemCount) - divRef.current!.offsetWidth ) {
            scrollWidth.current += e.deltaY
            listRef.current?.scrollTo(scrollWidth.current)
        } else if(e.deltaY < 0 && scrollWidth.current > - 50){
            scrollWidth.current += e.deltaY
            listRef.current?.scrollTo(scrollWidth.current)
        }
    }

    useEffect(()=>{
        if(divRef){
            divRef.current?.addEventListener('wheel',onScroll)
            return ()=>removeEventListener('wheel',onScroll)
        }
    },[])
    return(
        <CardListContext.Provider value={{card:{cardHeight,setCardHeight}}}>
            <div className={`w-full  h-full ${className}`} ref={divRef} style={{ display: 'flex', flexGrow: 1 }}>
                <AutoSizer style={{height:"100%"}}>
                    {({ width  }) => {
                        console.log(width)
                        // Use these actual sizes to calculate your percentage based sizes
                        return (
                            <FixedSizeList
                                className="scrollbar-hide"
                                ref={listRef}
                                layout="horizontal"
                                width={width}
                                height={cardHeight == 0 ? "100%" : cardHeight}
                                itemCount={itemCount}
                                itemSize={itemSize}
                                
                                
                            >
                                {children}
                            </FixedSizeList>
                        )
                    }}
                    </AutoSizer>   
            </div>
        </CardListContext.Provider>
    )
}