import { useDispatch, useSelector } from "react-redux";
import { TextButton } from "../buttons/TextButtons";
import { StoreCategoryForm } from "./StoreCategoryForm";
import { RootState } from "../../store/store";
import { useMutation } from "@tanstack/react-query";
import { StoreCategoriesModel } from "../../models/StoreCategories";
import { useStoreCategoriesService } from "../../services/storeCategoriesSevice";
import { checkForError } from "../../constraints";
import { addStoreCategory } from "../../store/storeSlice";

export function StoreCategoryCreate(){
    const dispatch = useDispatch()
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    const {mutateAsync} = useMutation({
        mutationKey:['store-create-sub-category'],
        mutationFn:async(storeCategory:StoreCategoriesModel)=>{
            //if(!storeCategory.store) return null;
            return await useStoreCategoriesService.createStoreCategory({storeCategory})    
        },
        onSuccess:(data)=>{
            if(store && store.store_categories && data && data.data){
                dispatch(addStoreCategory(data?.data))
            }
        }
    })
    return (
        <StoreCategoryForm onSubmitForm={async (storeCategoryInfo)=>{
            if(!store) return store
            const formattedData = useStoreCategoriesService.serilizeStoreCategoryData({storeCategory:storeCategoryInfo,store})
            if(formattedData){
                try{
                    await mutateAsync(formattedData)   
                } catch(e){
                    return checkForError(e)
                }
            }
            return null;
        }}>
            <TextButton
                text="CREATE CATEGORY"
                type="submit"
                onClick={()=>{
                    
                }}
            />
        </StoreCategoryForm>
    )
}