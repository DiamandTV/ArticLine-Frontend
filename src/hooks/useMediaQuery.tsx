// custom media query hook for watching the media query changes and when it matches the query sent , before change , after change is triggered
import {  useState,useEffect } from "react"
export interface useMediaQueryProps{
    query:string,
    beforeChange?:(isMatched:boolean)=>void,
    afterChange?:(isMatched:boolean)=>void
}
export function useMediaQuery({query,beforeChange,afterChange}:useMediaQueryProps){
    const [isMatched,setMatched] = useState(window.matchMedia(query).matches)
    useEffect(()=>{
        const matchQueryList = window.matchMedia(query)
        const handleChange = (e:MediaQueryListEvent)=>{
            if(beforeChange != null){
                beforeChange(e.matches)
            }
            
            setMatched(e.matches)
            if(afterChange != null) afterChange(e.matches)
            
        }

        matchQueryList.addEventListener('change',handleChange)
        return ()=>matchQueryList.removeEventListener('change',handleChange)
    })
    return isMatched
}