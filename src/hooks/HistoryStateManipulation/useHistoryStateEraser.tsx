import { useEffect } from "react"


export function useHistoryStateEraser(deps:React.DependencyList = []){
    useEffect(()=>{
        window.history.replaceState({},'')
    },deps)
    return null
}