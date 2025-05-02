import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider"
import { useGetBusinessStoreListQuery } from "@features/store/hooks/useGetBusinessStoreQuery/useGetBusinessStoreListQuery"
import { StoreBusinessCard } from "../cards/StoreCard/StoreCard"
import { useNavigate } from "react-router"

export function StoreList(){
    const navigator = useNavigate()
    const {isLoading,isSuccess,data,ref} = useGetBusinessStoreListQuery()
    if(isLoading || !isSuccess) return null
    console.log(data)
    return(
        <div>
            {data.map((store)=>{
                return(
                    <StoreProvider store={store}>
                        <StoreBusinessCard onClick={()=>{
                            navigator(`${store.id}/`)
                        }}/>
                    </StoreProvider>
                )
            })}
            <div ref={ref} className="py-1"/>
        </div>
    )
}