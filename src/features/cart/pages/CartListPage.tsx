import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { CartProvider } from "../context/CartContext/CartProvider";
import { CartCard, CartIntroCard } from "../components/cards/CartCard";
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn";
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal";


export function CartListPage(){
    const carts = useSelector((state:RootState)=>state.cartReducer.carts)
    if(!carts) return null
    // todo : finisce the Cart Intro Card
    return(
        <div className="w-full h-full flex flex-col gap-2">
            {
                carts.map((cart)=>{
                    return(
                        <div className="p-2">
                            <CartProvider cart={cart}>
                                <BottomSheetModalProviderFn>
                                    {
                                        ({setOpen})=>{
                                            return(
                                                <>
                                                    <CartIntroCard
                                                        onClick={()=>setOpen(true)}
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
                    )
                })
            }
        </div>
    )
}