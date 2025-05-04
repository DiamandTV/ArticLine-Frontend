import { BottomSheetModalProvider } from "@context/BottomSheetModal/BottomSheetModalProvider";
import { ProductList } from "@features/store/components/list/ProductList";
import {  StoreCategory } from "@features/store/components/list/StoreCategoryList";
import { PaddingView } from "@views/PaddingView";

export function BusinessStoreProductListPage(){
    return(
        <>
        <PaddingView className="w-full flex flex-col gap-2">
            <div className="w-full ">
                <StoreCategory.List/>
            </div>
            <BottomSheetModalProvider>
                <ProductList/>
            </BottomSheetModalProvider>
        </PaddingView>
        </>
    )
}