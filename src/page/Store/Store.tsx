import { StoreQuery } from "../../components/Store/StoreQuery";
import { StoreHeader } from "../../components/Store/StoreHeader/StoreHeader";
import { StoreCategoryTabs } from "../../components/Store/StoreCategoryTabs";
import { StoreBody } from "../../components/Store/StoreBody";
export function Store(){
    return (
        <StoreQuery>
            <div className="w-full flex flex-col gap-y-4">
                <StoreHeader/>
                <StoreCategoryTabs/>
                <StoreBody/>
            </div>
        </StoreQuery>
    )
}