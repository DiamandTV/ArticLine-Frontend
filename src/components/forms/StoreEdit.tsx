import { useMutation } from "@tanstack/react-query";
import { StoreModel } from "../../models/store"
import { TextButton } from "../buttons/TextButtons";
import { companyStoreService } from "../../services/companyStoreService";
import { StoreForm, StoreFormFields } from "./StoreForm";
import { checkForError } from "../../constraints";
import { useDispatch } from "react-redux";
import { deleteStore, updateStore } from "../../store/profileSlice";
import { AxiosResponse } from "axios";
import { useContext } from "react";
import { DrawerContext } from "../Drawer/DrawerContext";
import { updateStoreDetails } from "../../store/storeSlice";
import { DeleteButton } from "../buttons/DeleteButton";
import { useNavigate } from "react-router-dom";

interface StoreEditProps{
    store?:StoreModel
}
export function StoreFromEdit({store}:StoreEditProps){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {setOpen} = useContext(DrawerContext)
    //const store = useSelector((state:RootState)=>state.storeReducer.store)
    const {mutateAsync} = useMutation({
        mutationKey:['store-update'],
        mutationFn:async(storeData:StoreFormFields)=>{
            if(!store || !store.id) throw Error(); 
            const storeNoUrl = companyStoreService.filterImagesWithOutUrl(storeData)
            console.log(storeData)
            return companyStoreService.updateStore({store:storeNoUrl,storeId:store.id})
        },
        retry:2,
        onSuccess:(data:AxiosResponse)=>{
            console.log(data)
            if(data && data.data){
                const storeData = data.data as StoreModel 
                dispatch(updateStoreDetails(storeData))
                dispatch(updateStore(storeData))
                setOpen(false)
               
                //navigate(`/store/details/${storeData.id}/`)
                //dispatch(addStore(data.data))
            }
        }
    })
    
    return(
        <StoreForm
            store={store}
            onSubmitForm={async(storeData)=>{
                try{
                    await mutateAsync(storeData)   
                } catch(e){
                    return checkForError(e)
                }
            }}
        >  
            <div className="w-full h-14 flex flex-row justify-center gap-x-2">
                <TextButton
                    className="max-w-[1000px] w-full"
                    text="EDIT THE STORE"
                    type="submit"
                    onClick={()=>{

                    }}
                />
                <DeleteButton
                    onClick={()=>{
                        // ask for the user if he's convince about deleting the store
                        if(store )  {
                            try{
                                companyStoreService.deleteStore(store.id)
                                dispatch(deleteStore(store))
                                navigate('/store/list/company')
                                
                            } catch(e){
                                console.log(e)
                            }
                        } 
                        else {
                            //todo: show a toast error
                            
                        }
                    }}
                />
            </div>
        </StoreForm>
    )
}