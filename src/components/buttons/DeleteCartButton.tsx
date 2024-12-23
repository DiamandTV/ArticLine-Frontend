import { useDispatch } from "react-redux"
import { useCartService } from "../../services/cartService"
import { deleteCart } from "../../store/cartsSlice"
import { CartModel } from "../../models/cart"
import { DeleteButton } from "./DeleteButton"

export function DeleteCartButton({thisCart,className}:{thisCart?:CartModel,className:string}){
    const dispatch = useDispatch()
    return(
        <DeleteButton
            className={className}
            onClick={async()=>{
                    if(thisCart){
                        const data = await useCartService.deleteCart({cart:thisCart})
                        if(data){
                            dispatch(deleteCart(thisCart))
                        }
                    }
                }
            }
        /> 
    )
}