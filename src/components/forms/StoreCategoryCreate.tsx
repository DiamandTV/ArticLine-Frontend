import { useDispatch, useSelector } from "react-redux";
import { TextButton } from "../Buttons/TextButtons";
import { StoreCategoryForm } from "./StoreCategoryForm";
import { RootState } from "../../store/store";
import { useMutation } from "@tanstack/react-query";
import { StoreCategoriesModel } from "../../models/StoreCategories";
import { useStoreCategoriesService } from "../../services/storeCategoriesSevice";
import { checkForError } from "../../constraints";
import { addStoreCategory } from "../../store/storeSlice";
import { useContext } from "react";
import { DrawerContext } from "../Drawer/DrawerContext";
import { useNavigate } from "react-router-dom";

export function StoreCategoryCreate(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {setOpen} = useContext(DrawerContext)
    const store = useSelector((state:RootState)=>state.storeReducer.store)
    const {mutateAsync} = useMutation({
        mutationKey:['store-create-sub-category'],
        mutationFn:async(storeCategory:StoreCategoriesModel)=>{
            //if(!storeCategory.store) return null;
            return await useStoreCategoriesService.createStoreCategory({storeCategory})    
        },
        onSuccess:(data)=>{
            if(store && store.store_categories && data && data.data){
                const storeCategory = data.data as StoreCategoriesModel
                dispatch(addStoreCategory(storeCategory))
                // close the drawer
                setOpen(false)

                // if the createn sub category is the first one then navigate the user to it
                if(store.store_categories && store.store_categories.length == 0){
                    navigate(`sub-category/${storeCategory.id}`)
                }
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