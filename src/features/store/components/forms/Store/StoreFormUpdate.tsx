import { useContext } from "react";
import { StoreInfoFields, StoreInfoFieldsProvider } from "../../fields/Store/StoreFields";
import { StoreContext } from "@features/store/context/StoreContext/StoreContext";
import { storeToFields } from "@features/store/utils/formTransformers/store/storeTransformers";
import { DefaultResetter } from "@components/forms/Resetter/DefaultResetter";
import { storeInfoFieldsTransformedSchema, StoreInfoFieldsType } from "@features/store/model/Store/Fields/StoreFields";
import { useGetCategoryQuery } from "@features/home/hook/useGetCategoryQuery/useGetCategoryQuery";
import { FormUpdateButton } from "@components/buttons/FormUpdateButton/FormUpdateButton";
import { storeBusinessServices } from "@features/store/services/storeBusinessServices";
import { useMutation } from "react-query";
import { StoreFormProps } from "./StoreForm";
import { storeCacheKey } from "@features/store/data/query";

export function Update(params:StoreFormProps){
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
                <UpdateButton {...params}/>
            </StoreInfoFieldsProvider>
        </div>
    )
}

function UpdateButton(params:StoreFormProps){
    const {storeId} = params
    const mutationResults = useMutation({
            mutationKey:[storeCacheKey.update],
            mutationFn:async(params:StoreInfoFieldsType)=>{
                return await storeBusinessServices.update(storeId!,storeInfoFieldsTransformedSchema.parse(params))
            },
            onSuccess:(data)=>{
                // todo:send to the list of pages
                console.log(data)
            },
            onError:()=>{
                
            }
        })
    return (
        <FormUpdateButton<StoreInfoFieldsType> 
            mutationResult={mutationResults}
            schema={storeInfoFieldsTransformedSchema}
        />
    )
}