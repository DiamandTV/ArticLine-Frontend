import { useDispatch, useSelector } from "react-redux";
import { TextButton } from "../Buttons/TextButtons";
import { StoreCategoryForm } from "./StoreCategoryForm";
import { RootState } from "../../store/store";
import { useMutation } from "@tanstack/react-query";
import { StoreCategoriesModel } from "../../models/StoreCategories";
import { useStoreCategoriesService } from "../../services/storeCategoriesSevice";
import { checkForError } from "../../constraints";
import { deleteStoreCategory,updateStoreCategory } from "../../store/storeSlice";
import { useContext } from "react";
import { DrawerContext } from "../Drawer/DrawerContext";
import { DeleteButton } from "../Buttons/DeleteButton";

export function StoreCategoryEdit({storeCategory}:{storeCategory:StoreCategoriesModel|undefined}){
    const dispatch = useDispatch()
    const {setOpen} = useContext(DrawerContext)
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    const {mutateAsync} = useMutation({
        mutationKey:['store-update-sub-category'],
        mutationFn:async(storeCategory:StoreCategoriesModel)=>{
            //if(!storeCategory.store) return null;
            return await useStoreCategoriesService.updateStoreCategory({storeCategory})    
        },
        onSuccess:(data)=>{
            if(store && store.store_categories && data && data.data){
                dispatch(updateStoreCategory(data?.data))
                // close the drawer
                setOpen(false)
            }
        }
    })
    return (
        <StoreCategoryForm 
            storeCategory={storeCategory}
            onSubmitForm={async (storeCategoryInfo)=>{
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
            <div className="w-full h-14 flex flex-row justify-center items-center gap-x-2">
                <TextButton
                    className="w-full max-w-[1000px]"
                    text="EDIT CATEGORY"
                    type="submit"
                    onClick={()=>{
                        
                    }}  
                />
                <DeleteButton
                    onClick={async ()=>{
                        try{
                            if(!storeCategory) return
                            await useStoreCategoriesService.deleteStoreCategory({storeCategory})
                            dispatch(deleteStoreCategory(storeCategory))
                            setOpen(false)
                        }catch(e){
                            console.log(e)
                        }
                    }}
                />
            </div>
        </StoreCategoryForm>
    )
}