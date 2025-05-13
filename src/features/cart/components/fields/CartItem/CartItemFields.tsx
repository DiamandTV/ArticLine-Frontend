import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { useCartItemContext } from "@features/cart/context/CartItemContext/CartItemProvider";
import { cartItemInfoFieldsSchema, CartItemInfoFieldsType } from "@features/cart/model/CartItem/Field/CartItemField";
import { useProductContext } from "@features/store/context/ProductContext/ProductProvider";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { useEffect } from "react";

import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";

function CartItemInfoDefaulFields({children}:{children:React.ReactNode}){
    //const {product} = useProductContext()
    const {cartItem} = useCartItemContext()
    const {reset} = useFormContext<CartItemInfoFieldsType>() 

    useEffect(()=>{
        console.log("OK")
        console.log(cartItem)
        reset({
            product_quantity:cartItem?.product_quantity ?? 0
        },{keepDirty:true})
    },[cartItem])

    return children
}

export function CartItemInfoFieldsProvider(props:FieldsProviderProps<CartItemInfoFieldsType>){
    const {product} = useProductContext()
    return(
        <FieldsProvider<CartItemInfoFieldsType> 
            {...props} 
            defaultValues={{
                product_item:product.id
            }}
            schema={cartItemInfoFieldsSchema}>
                <CartItemInfoDefaulFields>
                    {props.children}
                </CartItemInfoDefaulFields>
        </FieldsProvider>
    )
}

export function CartItemInfoFields(props:FieldsProps){
    const {watch,getValues,setValue} = useFormContext<CartItemInfoFieldsType>()
    const className = tailwindMerge("w-full h-full flex flex-col items-center justify-center gap-2 p-0 m-0 ",props.className)
    const increase = ()=>{
        const product_quantity = getValues('product_quantity')
        setValue('product_quantity',product_quantity+1)
    }
    const decrease = ()=>{
        const product_quantity = getValues('product_quantity')
        if(product_quantity > 0){
            setValue('product_quantity',product_quantity-1)
        }
    }

    return(
        <Form
            {...props}
            className={className}
        >
            {/* Selettore quantità */}
            <div className="w-full h-full flex justify-center items-center border border-gray-300 rounded overflow-hidden">
            <button type="button" onClick={decrease} className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                <FaMinus />
            </button>
            <span className="px-4">{watch('product_quantity')}</span>
            <button type="button" onClick={increase} className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                <FaPlus />
            </button>
            </div>
        </Form>
    )
}