import { StoreCategoryList } from "@features/store/components/list/StoreCategoryList";
import { StoreBusinessHeader } from "@features/store/components/store/StoreHeader";
import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider";
import { useGetBusinessStoreQuery } from "@features/store/hooks/useGetBusinessStoreQuery/useGetBusinessStoreQuery";
import { useParams } from "react-router";

export function BusinessStorePage(){
    const params = useParams()
    const storeId = params['store-id']
    const {data,isLoading,isSuccess} = useGetBusinessStoreQuery({id:Number(storeId)})
    if(!storeId) return 
    
    if(isLoading || !isSuccess) return
    return(
        <div className="w-full h-max flex flex-col gap-3 bg-surface-a0">
            <StoreProvider store={data}>
                <StoreBusinessHeader/>
                <hr className="mx-2"/>
                <StoreCategoryList/>
            </StoreProvider>
        </div>
    )
}