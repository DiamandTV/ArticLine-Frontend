import { CartItemInfoFields, CartItemInfoFieldsProvider } from "../../fields/CartItem/CartItemFields"
import { CartItemInfoFieldsType } from "@features/cart/model/CartItem/Field/CartItemField"
import { useFormContext } from "react-hook-form"
import { FaShoppingCart } from "react-icons/fa"
import { useProductContext } from "@features/store/context/ProductContext/ProductProvider"
import { useCartItemContext } from "@features/cart/context/CartItemContext/CartItemProvider"
import { useEffect } from "react"
import { useAddUpdateCartItemMutation } from "@features/cart/hooks/useAddUpdateCartItemMutation/useAddUpdateCartItemMutation"


function CartItemInfoAddDefaulFields({children}:{children:React.ReactNode}){
    const {product} = useProductContext()
    const {cartItem} = useCartItemContext()
    const {reset} = useFormContext<CartItemInfoFieldsType>() 

    useEffect(()=>{
        console.log("OK")
        console.log(cartItem)
        reset({
            product_item:product.id,
            product_quantity:cartItem?.product_quantity ?? 0
        },{keepDirty:true})
    },[cartItem])

    return children
}


export function Add(){
    return(
        <CartItemInfoFieldsProvider>
            <CartItemInfoAddDefaulFields>
                <div className="w-full grid grid-cols-2 items-center justify-between gap-2">
                    <CartItemInfoFields/>
                    <AddButton/>
                </div>
            </CartItemInfoAddDefaulFields>
        </CartItemInfoFieldsProvider>
    )
}

export function AddButton(){
    const {mutateAsync} = useAddUpdateCartItemMutation()
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