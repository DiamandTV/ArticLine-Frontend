import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal";
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn";
import { CartCard } from "@features/cart/components/cards/CartCard";
import { Cart } from "@features/cart/compositions/Cart";
import { CartProvider } from "@features/cart/context/CartContext/CartProvider";
import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router";

export function StoreCartView(){
    const params = useParams()
    const carts = useSelector((state:RootState)=>state.cartReducer.carts)
    const storeId = params['store-id']
    if(!storeId) return
    const cart = carts?.find((cart)=>cart.store.id === Number(storeId))
    return(
        <div className="w-full h-full">
            <Outlet/>
            { cart ? 
            <div className="w-max p-2 px-3 bg-primary-a30 text-surface-a10 fixed bottom-16 right-0 rounded-l-lg text-2xl">
                <CartProvider cart={cart}>
                    <BottomSheetModalProviderFn>
                        {
                            ({setOpen})=>{
                                return(
                                    <>
                                        <Cart.CartBadge
                                            onClick={()=>setOpen(true)}
                                            className="text-2xl"
                                        />
                                        <SimpleBottomSheetModal detent="content-height">
                                            <CartCard/>
                                        </SimpleBottomSheetModal>
                                    </>
                                )
                            }
                        }
                    </BottomSheetModalProviderFn>
                </CartProvider>
            </div>
            : null    
            }
        </div>
    )
}