import { useMutation } from "@tanstack/react-query";
import { StoreForm, StoreFormFields } from "./StoreForm";
import { TextButton } from "../Buttons/TextButtons";
import { checkForError } from "../../constraints";
import { companyStoreService } from "../../services/companyStoreService";
import { useDispatch } from "react-redux";
import { addStore } from "../../store/profileSlice";
import { useNavigate } from "react-router-dom";
import { StoreModel } from "../../models/store";

export function StoreFormCreate(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {mutateAsync} = useMutation({
        mutationKey:['store-create'],
        mutationFn:async(storeData:StoreFormFields)=>await companyStoreService.createStore(storeData),
        retry:2,
        onSuccess:(data)=>{
            const storeData = data.data as StoreModel
            navigate(`/store/details/${storeData.id}/`)
            dispatch(addStore(data.data))
        }
    })
    return(
        <StoreForm
            onSubmitForm={async (storeData:StoreFormFields)=>{
                    try{
                        console.log(storeData)
                        await mutateAsync(storeData)   
                    } catch(e){
                        return checkForError(e)
                    }
                }
            }
        >
            <TextButton
                text="CREATE THE STORE"
                type="submit"
                onClick={()=>{

                }}
            />
        </StoreForm>
    )
}