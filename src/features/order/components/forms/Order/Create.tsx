import { Button, Spinner } from "react-bootstrap";
import { OrderInfoFields, OrderInfoFieldsProvider } from "../../fields/Order/OrderFields";
import { useCartContext } from "@features/cart/context/CartContext/CartProvider";
import { useFormContext } from "react-hook-form";
import { OrderInfoFieldsType } from "@features/order/models/Order/Field/OrderField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import { useMutation } from "react-query";
import { orderCacheKey } from "@features/order/data/query";
import { orderServices } from "@features/order/services/orderServices";
import { cartSliceActions } from "@features/cart";

export function Create(){
    const {cart} = useCartContext()
    const entityAddressId = useSelector((state:RootState)=>state.authReducer.profile?.entity_address?.id)

    return(
        <div className="w-full flex flex-col gap-2 ">
            <OrderInfoFieldsProvider defaultValues={{
                cart:cart?.id,
                entity_address:entityAddressId,
                request_earliest_delivery:true
            }}>
                <OrderInfoFields/>
                <CreateButton/>
            </OrderInfoFieldsProvider>
        </div>
    )
}

function CreateButton(){
    const dispatch = useDispatch()
    const {cart} = useCartContext()
    const {trigger,getValues} = useFormContext<OrderInfoFieldsType>()
    const {mutateAsync,isLoading} = useMutation({
        mutationKey:[orderCacheKey.create],
        mutationFn:async(orderInfo:OrderInfoFieldsType)=>await orderServices.create(orderInfo),
        onError:(error)=>{
            console.log(error)
        },
        onSuccess:(data)=>{
            // todo navigate
            dispatch(cartSliceActions.removeCart(data.data))
        }
    })
    if(!cart) return null
    const total = cart.subtotal_cost + cart.shipping_cost
    const onClick = async()=>{
        const isNotErrors = await trigger()
        if(isNotErrors){
            const orderInfo = getValues()
            await mutateAsync(orderInfo)
        } 
    }
    return (
        <Button 
            className="text-sm font-medium" 
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading ? <Spinner/> : `PLACE THIS ORDER | €${total}`}
        </Button>
    )
}