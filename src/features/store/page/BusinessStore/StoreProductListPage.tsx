import { BackButton } from "@components/buttons/BackButton/BackButton";
import { ProductList } from "@features/store/components/list/ProductList";
import { PaddingView } from "@views/PaddingView";
import { useNavigate, useParams } from "react-router";
export function StoreProductListPage(){
    return <BusinessStoreProductListPage/>
}
export function BusinessStoreProductListPage(){
   
    return(
        <>
        <PaddingView className="w-full flex flex-col gap-2">
            <BackToStorePage/>
            <ProductList/>
        </PaddingView>
        </>
    )
}

function BackToStorePage(){
    const params = useParams()
    const navigator = useNavigate()
    return(
        <BackButton
            onClick={()=>{
                const storeId = params['store-id']
                if(storeId){
                    navigator(`/store/${storeId}/`)
                }
            }}
        />
    )
}