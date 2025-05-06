import { DeleteButton } from "@components/buttons/DeleteButton/DeleteButton";
import { StoreFormProps } from "./StoreForm";

export function Delete(params:StoreFormProps){
    console.log(params)
    return(
        <DeleteButton/>
    )
}