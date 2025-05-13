import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { Add } from "./CartItemFormADd";
import { Update } from "./CartItemFormUpdate";

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
