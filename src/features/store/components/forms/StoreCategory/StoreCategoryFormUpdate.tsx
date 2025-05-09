import { StoreCategoryContext } from "@features/store/context/StoreCategoryContext/StoreCategoryContext";
import { useContext } from "react";
import { StoreCategoryFields, StoreCategoryInfoFieldsProvider } from "../../fields/StoreCategory/StoreCategoryFields";
import { DefaultResetter } from "@components/forms/Resetter/DefaultResetter";
import { storeCategoryInfoFieldsSchema, StoreCategoryInfoFieldsType } from "@features/store/model/StoreCategory/Fields/StoreCategoryFields";
import { storeCategoryToFields } from "@features/store/utils/formTransformers/storeCategory/storeCategoryTransformers";
import { StoreCategoryFormProps } from "./StoreCategoryForm";
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";
import { useMutation } from "react-query";
import { storeBusinessCategoryServices } from "@features/store/services/storeBusinessCategoryService";
import { FormUpdateButton } from "@components/buttons/FormUpdateButton/FormUpdateButton";
import { storeCategoryCacheKey } from "@features/store/data/query";

export function Update(params:StoreCategoryFormProps){
    const {storeCategory} = useContext(StoreCategoryContext)
    if(!storeCategory) return
    return(
        <div className="w-full flex flex-col gap-2 ">
            <StoreCategoryInfoFieldsProvider>
                <DefaultResetter<StoreCategoryInfoFieldsType> toFields={async()=>await storeCategoryToFields(storeCategory)} />
                <StoreCategoryFields/>
                <UpdateButton {...params}/>
            </StoreCategoryInfoFieldsProvider>
        </div>
    )
}


function UpdateButton(params:StoreCategoryFormProps){
    const {storeId,storeCategoryId} = params
    const {setOpen} = useContext(BottomSheetModalContext) 
    const mutationResults = useMutation({
        mutationKey:[storeCategoryCacheKey.update],
        mutationFn:async(storeCategoryInfo:StoreCategoryInfoFieldsType)=>{
            return await storeBusinessCategoryServices.update(storeId,storeCategoryId!,storeCategoryInfo)
        },
        onSuccess:(data)=>{
            // todo: save this in the cache
            console.log(data)
            setOpen(false)
        }
    })
    return(
        <FormUpdateButton<StoreCategoryInfoFieldsType>
            mutationResult={mutationResults}
            schema={storeCategoryInfoFieldsSchema}
        />
    )
}