import { useFormContext } from "react-hook-form";
import { CartItemInfoFields } from "../../fields/CartItem/CartItemFields";
import { CartItemInfoFieldsType } from "@features/cart/model/CartItem/Field/CartItemField";
import { FaShoppingCart } from "react-icons/fa";
import { useMutation } from "react-query";
import { cartItemCacheKey } from "@features/cart/data/query";
import { cartItemServices } from "@features/cart/services/cartItemServices";

export function CartItemForm(){
    return(
        <div className="w-full grid grid-cols-2 items-center justify-between gap-2">
            <CartItemInfoFields/>
            <AddButton/>
        </div>
    )
}

export function AddButton(){
    const {mutateAsync} = useMutation({
        mutationKey:[cartItemCacheKey.add],
        mutationFn:async(cartItemInfo:CartItemInfoFieldsType)=>await cartItemServices.add(cartItemInfo),
        onSuccess:(data)=>{
            console.log(data)
            
        },
        onError:(error)=>{
            console.log(error)
            // todo : handle all the errors
        }
    })
    const {getValues} = useFormContext<CartItemInfoFieldsType>()
    const handleAddToCart = async()=>{
        const cartItemInfo = getValues()
        await mutateAsync(cartItemInfo)
    }
    return(
        <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
            <FaShoppingCart />
            <span>Aggiungi</span>
        </button>
    )
}