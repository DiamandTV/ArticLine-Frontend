import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { CartItemInfoFields, CartItemInfoFieldsProvider } from "../../fields/CartItem/CartItemFields";
import { useCartItemContext } from "@features/cart/context/CartItemContext/CartItemProvider";
import { useFormContext } from "react-hook-form";
import { CartItemInfoFieldsType } from "@features/cart/model/CartItem/Field/CartItemField";
import { useEffect, useRef } from "react";
import { useAddUpdateCartItemMutation } from "@features/cart/hooks/useAddUpdateCartItemMutation/useAddUpdateCartItemMutation";

const TIMEOUT_INPUT_QUERY = 2000

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
    const first = useRef<boolean>(true)
    const timer = useRef<number|null>(null)
    
    const {watch,getValues,setValue} = useFormContext<CartItemInfoFieldsType>()
    const lastFormValue = useRef<CartItemInfoFieldsType>(getValues())
    const product_quantity = watch('product_quantity')
    const {mutateAsync} = useAddUpdateCartItemMutation()

    useEffect(()=>{
        if(first.current){
            first.current = false
        } else {
            
           if(timer.current){
                clearTimeout(timer.current!)
            } 
           
            timer.current = setTimeout(async()=>{
                const currentFormValue = getValues()
                if(lastFormValue.current?.product_quantity === currentFormValue.product_quantity) return
                const cartItemInfo = currentFormValue
                try{
                    await mutateAsync?.(cartItemInfo)
                    lastFormValue.current = currentFormValue
                }catch{
                    alert("ERROR")
                    setValue('product_quantity',lastFormValue.current?.product_quantity ?? cartItemInfo.product_quantity)
                }
            },TIMEOUT_INPUT_QUERY)
            
        }
    },[product_quantity])

    return null
}