import { StoreCategory } from "@features/store/components/list/StoreCategoryList";
import { StoreBusinessHeader } from "@features/store/components/store/StoreHeader";
import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider";
import { useGetBusinessStoreQuery } from "@features/store/hooks/useGetBusinessStoreQuery/useGetBusinessStoreQuery";
import { useParams } from "react-router";

export function StorePage(){
    return <BusinessStorePage/>
}

function BusinessStorePage(){
    const params = useParams()
    const companyId = params['company-id']
    const storeId = params['store-id']
    const {data,isLoading,isSuccess} = useGetBusinessStoreQuery({
        companyId:Number(companyId),
        storeId:Number(storeId)
    })
    if(!storeId) return 
    
    if(isLoading || !isSuccess) return
    return(
        <div className="w-full h-max flex flex-col gap-3 bg-surface-a0">
            <StoreProvider store={data}>
                <StoreBusinessHeader/>
                <hr className="mx-2"/>
                <StoreCategory.Grid/>
            </StoreProvider>
        </div>
    )
}