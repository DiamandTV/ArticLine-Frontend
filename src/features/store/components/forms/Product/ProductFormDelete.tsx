import { DeleteButton } from "@components/buttons/DeleteButton/DeleteButton";
import { ProductFormProps } from "./ProductForm";

export function Delete(params:ProductFormProps){
    console.log(params)
    return(
         <DeleteButton/>
    )
}