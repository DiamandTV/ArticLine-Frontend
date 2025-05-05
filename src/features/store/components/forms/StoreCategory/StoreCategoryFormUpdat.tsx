import { StoreCategoryContext } from "@features/store/context/StoreCategoryContext/StoreCategoryContext";
import { useContext } from "react";
import { StoreCategoryFields, StoreCategoryInfoFieldsProvider } from "../../fields/StoreCategory/StoreCategoryFields";
import { DefaultResetter } from "@components/forms/Updater/DefaultResetter";
import { StoreCategoryInfoFieldsType } from "@features/store/model/StoreCategory/Fields/StoreCategoryFields";
import { storeCategoryToFields } from "@features/store/utils/formTransformers/storeCategory/storeCategoryTransformers";
import { Button } from "react-bootstrap";

export function Update(){
    const {storeCategory} = useContext(StoreCategoryContext)
    if(!storeCategory) return
    return(
        <div className="w-full flex flex-col gap-2 ">
            <StoreCategoryInfoFieldsProvider>
                <DefaultResetter<StoreCategoryInfoFieldsType> toFields={async()=>await storeCategoryToFields(storeCategory)} />
                <StoreCategoryFields/>
                <UpdateButton/>
            </StoreCategoryInfoFieldsProvider>
        </div>
    )
}


function UpdateButton(){
    return(
        <Button>
            SAVE
        </Button>
    )
}