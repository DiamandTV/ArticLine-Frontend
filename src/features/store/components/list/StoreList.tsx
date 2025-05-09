import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider"
import { useGetBusinessStoreListQuery } from "@features/store/hooks/useGetBusinessStoreQuery/useGetBusinessStoreListQuery"
import { StoreBusinessCard } from "../cards/StoreCard/StoreCard"
import { useNavigate, useParams } from "react-router"
import { getKey } from "@lib/kegGenerator/keyGenerator"

export function StoreList(){
    const params = useParams()
    const navigator = useNavigate()
    const {isLoading,isSuccess,data,ref} = useGetBusinessStoreListQuery({
        companyId:Number(params['company-id'])
    })
    if(isLoading || !isSuccess) return null
    console.log(data)
    return(
        <div>
            {data.map((store)=>{
                return(
                    <StoreProvider store={store}>
                        <StoreBusinessCard  
                            key={getKey()}
                            onClick={()=>{
                                navigator(`/company/${store.company_profile}/store/${store.id}/`)
                            }}/>
                    </StoreProvider>
                )
            })}
            <div ref={ref} className="py-1"/>
        </div>
    )
}