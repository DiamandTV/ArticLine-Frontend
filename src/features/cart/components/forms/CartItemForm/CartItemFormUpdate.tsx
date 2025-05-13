import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { CartItemInfoFields, CartItemInfoFieldsProvider } from "../../fields/CartItem/CartItemFields";
import { useCartItemContext } from "@features/cart/context/CartItemContext/CartItemProvider";
import { useFormContext } from "react-hook-form";
import { CartItemInfoFieldsType } from "@features/cart/model/CartItem/Field/CartItemField";
import { useEffect, useRef } from "react";

export function Update(props:FieldsProps){
    const {cartItem} = useCartItemContext()
    return(
         <CartItemInfoFieldsProvider
            defaultValues={{
                product_item:cartItem?.product_item.id,
                product_quantity:cartItem?.product_quantity
            }}
         >
                <CartItemInfoFields {...props}/>
                <UpdateLogic/>
        </CartItemInfoFieldsProvider>
    )
}

function UpdateLogic(){
    const {watch} = useFormContext<CartItemInfoFieldsType>()
    const first = useRef<boolean>(true)
    const timer = useRef<number|null>(null)

    useEffect(()=>{
        if(first){
            first.current = false
        } else {
            if(timer.current){
                clearTimeout(timer.current!)
            }
    
            timer.current = setTimeout(async()=>{
                 
                await mutateAsync?.(address.current)
            },TIMEOUT_INPUT_QUERY)
        }

    },[watch('product_quantity')])

    return null
}