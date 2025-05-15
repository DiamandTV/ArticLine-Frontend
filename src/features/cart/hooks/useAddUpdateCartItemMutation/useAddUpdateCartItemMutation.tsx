import { AlertCard } from "@components/cards/AlertCard/AlertCard"
import { cartItemCacheKey } from "@features/cart/data/query"
import { CartItemInfoFieldsType } from "@features/cart/model/CartItem/Field/CartItemField"
import { CartResponseMapStatusType, CartResponseType } from "@features/cart/model/CartResponse.ts/CartResponse"
import { cartItemServices } from "@features/cart/services/cartItemServices"
import { decodeServerPayloadMsg } from "@utils/serverErrorDecode/errorDecode"
import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

export function useAddUpdateCartItemMutation(){
    const mutationResults = useMutation({
            mutationKey:[cartItemCacheKey.addUpdate],
            mutationFn:async(cartItemInfo:CartItemInfoFieldsType)=>await cartItemServices.addUpdate(cartItemInfo),
            onSuccess:(data)=>{
                console.log(data)
                
            },
            onError:(error)=>{
                if(error instanceof AxiosError){
                    const messages = decodeServerPayloadMsg(error)
                    if(messages.length > 0 ){
                        messages.forEach((msg)=>{
                            if(Object.keys(CartResponseMapStatusType).includes(msg)){
                                const code = msg as CartResponseType
                                switch(code) {
                                    case 'MAX-CART-LIMIT-REACHED':
                                        toast(
                                            <AlertCard
                                                variant="danger"
                                                title="🛒 Cart limit reached"
                                                message="You’ve reached the maximum number of carts allowed. Please remove an existing cart or contact support to proceed."
                                            />,
                                            {
                                                className: "w-full",
                                                position: "top-center",
                                                hideProgressBar: true,
                                            }
                                        );
                                        return;

                                    case 'COMPANY-PURCHASE-FORBID':
                                        toast(
                                            <AlertCard
                                                variant="danger"
                                                title="🏢 Action not allowed"
                                                message="Your company cannot create a cart in its own store. Please select a different store or contact support if you believe this is an error."
                                            />,
                                            {
                                                
                                                className: "w-full ",
                                                position: "top-center",
                                                hideProgressBar: true,
                                            }
                                        );
                                        return;
                                }

                            }
                        })
                    }
                }
            }
            
        })

    return mutationResults
}