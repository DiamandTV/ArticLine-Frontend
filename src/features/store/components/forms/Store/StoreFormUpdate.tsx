import { useContext } from "react";
import { StoreInfoFields, StoreInfoFieldsProvider } from "../../fields/Store/StoreFields";
import { StoreContext } from "@features/store/context/StoreContext/StoreContext";
import { storeToFields } from "@features/store/utils/formTransformers/store/storeTransformers";
import { DefaultResetter } from "@components/forms/Updater/DefaultResetter";
import { StoreInfoFieldsType } from "@features/store/model/Store/Fields/StoreFields";
import { useGetCategoryQuery } from "@features/home/hook/useGetCategoryQuery/useGetCategoryQuery";
import { Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export function Update(){
    const {store} = useContext(StoreContext)
    const {data,isLoading,isSuccess} = useGetCategoryQuery()
    if(!store || isLoading || !isSuccess) return

    const toFields = async():Promise<StoreInfoFieldsType>=>{
        const fields = await storeToFields(store)
        const categoriesSelectInput = fields.categories.map((categoryId)=>{
            const category = data!.find((cat)=>cat.id === categoryId)
            return {
                value:category!.id,
                label:category!.name
            }
        })
        return{
            ...fields,
            categories:categoriesSelectInput
        }
    }

    return(
        <div className="w-full flex flex-col gap-2 ">
            <StoreInfoFieldsProvider>
                <DefaultResetter<StoreInfoFieldsType> toFields={toFields}/>
                <StoreInfoFields />
                <UpdateButton/>
            </StoreInfoFieldsProvider>
        </div>
    )
}

function UpdateButton(){
    const {formState:{isDirty}} = useFormContext<StoreInfoFieldsType>()
    return(
        <Button disabled={!isDirty}>
            SAVE
        </Button>
    )
}