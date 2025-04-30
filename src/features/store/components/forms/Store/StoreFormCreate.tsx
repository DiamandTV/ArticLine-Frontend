import { StoreInfoFields, StoreInfoFieldsProvider } from "../../fields/Store/StoreFields";

export function _Create(){
    return(
        <div className="w-full flex flex-col gap-2 ">
            <StoreInfoFieldsProvider>
                <StoreInfoFields />
            </StoreInfoFieldsProvider>
        </div>
    )
}