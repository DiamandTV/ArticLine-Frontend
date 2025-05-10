import { StoreBusinessList } from "@features/store/components/list/StoreList";
import { PaddingView } from "@views/PaddingView";

export function BusinessStoreListPage(){
    return(
        <PaddingView className="w-full block">
            <StoreBusinessList/>
        </PaddingView>
    )
}