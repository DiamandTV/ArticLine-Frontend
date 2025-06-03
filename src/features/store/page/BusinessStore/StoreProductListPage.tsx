import { BackButton } from "@components/buttons/BackButton/BackButton";
import { ProductList } from "@features/store/components/list/ProductList";
import { useNavigate, useParams } from "react-router";
export function StoreProductListPage(){
    return <BusinessStoreProductListPage/>
}
export function BusinessStoreProductListPage(){
   
    return(
        <>
            <div className="flex flex-col h-full gap-2 m-mb-df md:mx-df ">
                <BackToStorePage/>
                <ProductList/>
            </div>
        </>
    )
}

function BackToStorePage(){
    const params = useParams()
    const navigator = useNavigate()
    return(
        <BackButton
            className="w-max"
            onClick={()=>{
                const storeId = params['store-id']
                const companyId = params['company-id']
                if(storeId){
                    navigator(`/company/${companyId}/store/${storeId}/`)
                }
            }}
        />
    )
}