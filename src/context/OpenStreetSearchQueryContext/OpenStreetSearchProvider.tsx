import { useMutation } from "react-query"
import { OpenStreetSearchContext } from "./OpenStreetSearchContext"
import { openStreetMapRepository } from "src/respository/openStreetMapRepository/openStreetMapRepository"

interface OpenStreetSearchProviderProps{
    children:React.ReactNode
}

export function OpenStreetSearchProvider({children}:OpenStreetSearchProviderProps){
    const mutationOptions = useMutation({
        mutationKey:['address'],
        mutationFn:async(address:string)=>{
            return await openStreetMapRepository.search(address)
        },
        onError:(error)=>{
            console.log(error)
        }
    })
    return(
        <OpenStreetSearchContext.Provider value={mutationOptions}>
            {children}
        </OpenStreetSearchContext.Provider>
    )
}