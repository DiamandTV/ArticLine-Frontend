import { FieldsProvider } from "@features/autentication/context/FieldsProvider/FieldsProvider";
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps";
import { FieldsProviderProps } from "@features/autentication/models/Fields/FieldsProviderProps";
import { cartItemInfoFieldsSchema, CartItemInfoFieldsType } from "@features/cart/model/CartItem/Field/CartItemField";

import { tailwindMerge } from "@lib/tsMerge/tsMerge";


import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { FaMinus, FaPlus } from "react-icons/fa";

export function CartItemInfoFieldsProvider(props:FieldsProviderProps<CartItemInfoFieldsType>){
    return(
        <FieldsProvider<CartItemInfoFieldsType> 
            {...props} 
            schema={cartItemInfoFieldsSchema}>

                {props.children}
        </FieldsProvider>
    )
}

export function CartItemInfoFields(props:FieldsProps){
    const {watch,getValues,setValue} = useFormContext<CartItemInfoFieldsType>()
    const className = tailwindMerge("w-full h-full flex justify-between items-center gap-2 border border-gray-300 rounded overflow-hidden px-2 py-1 ",props.className)
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

            <button type="button" onClick={decrease} className="py-1 text-gray-600 hover:bg-gray-100">
                <FaMinus />
            </button>
            <span className="">{watch('product_quantity')}</span>
            <button type="button" onClick={increase} className="py-1 text-gray-600 hover:bg-gray-100">
                <FaPlus />
            </button>
   
        </Form>
    )
}