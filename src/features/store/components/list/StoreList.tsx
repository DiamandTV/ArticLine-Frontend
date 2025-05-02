import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider"
import { useGetBusinessStoreQuery } from "@features/store/hooks/useGetBusinessStoreQuery/useGetBusinessStoreQuery"
import { StoreBusinessCard } from "../cards/StoreCard/StoreCard"

export function StoreList(){
    const {isLoading,isSuccess,data,ref} = useGetBusinessStoreQuery()
    if(isLoading || !isSuccess) return null
    console.log(data)
    return(
        <div>
            {data.map((store)=>{
                return(
                    <StoreProvider store={store}>
                        <StoreBusinessCard onClick={()=>{
                            alert("CLICK")
                        }}/>
                    </StoreProvider>
                )
            })}
            <div ref={ref} className="py-1"/>
        </div>
    )
}