import { StoreQuery } from "../../components/Store/StoreQuery";
import { StoreHeader } from "../../components/Store/StoreHeader";
import { StoreBody } from "../../components/Store/StoreBody";
export function Store(){
    return (
        <StoreQuery>
            <div className="w-full h-full flex flex-col gap-y-4">
                <StoreHeader/>
                <StoreBody/>
            </div>
        </StoreQuery>
    )
}