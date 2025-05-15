import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { Update } from "./CartItemFormUpdate";
import { Add } from "./CartItemFormAdd";

export const CartItemForm = {
    Add:()=>{
        return(
            <Add/>
        )
    },
    Update:(props:FieldsProps)=>{
        return(
            <Update {...props}/>
        )
    }
}
