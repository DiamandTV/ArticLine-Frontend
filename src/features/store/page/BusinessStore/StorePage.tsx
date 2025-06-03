import { StoreCategory } from "@features/store/components/list/StoreCategoryList";
import { StoreBusinessHeader } from "@features/store/components/store/StoreHeader";
import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider";
import { useGetBusinessStoreQuery } from "@features/store/hooks/useGetBusinessStoreQuery/useGetBusinessStoreQuery";

import { useParams } from "react-router";

export function StorePage(){
    return (
        <BusinessStorePage/>
    )
    
    
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

        <div className="flex flex-col w-full h-full gap-0 bg-surface-a0">
                <StoreProvider store={data}>
                    <StoreBusinessHeader/>
                    <hr className="px-2 mt-3"/>
                    <div className="h-full pt-3 bg-surface-a20">
                        <StoreCategory.Grid/>
                    </div>
                </StoreProvider>
            
        </div>
     
    )
}