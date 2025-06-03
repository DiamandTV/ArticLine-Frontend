import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { CartProvider } from "../context/CartContext/CartProvider";
import { CartCard, CartIntroCard } from "../components/cards/CartCard";
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn";
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal";
import { useRef } from "react";
import { DivRefProvider } from "@context/DivRefContext/DivRefProvider";


export function CartListPage(){
    const divRef = useRef<HTMLDivElement|null>(null)
    const carts = useSelector((state:RootState)=>state.cartReducer.carts)
    if(!carts) return null
    // todo : finisce the Cart Intro Card
    return(
        <div className="grid h-full grid-cols-1 gap-2 md:grid-cols-2 mx-mb-df my-mb-df ">
            <div className="w-full ">
                {
                    carts.map((cart)=>{
                        return(
                        
                                <CartProvider cart={cart}>
                                    <BottomSheetModalProviderFn>
                                        {
                                            ({setOpen})=>{
                                                return(
                                                    <>
                                                        <CartIntroCard
                                                            className="h-max"
                                                            onClick={()=>setOpen(true)}
                                                        />
                                                        <DivRefProvider divRef={divRef}>
                                                            <SimpleBottomSheetModal detent="content-height">
                                                                <CartCard />
                                                            </SimpleBottomSheetModal>
                                                        </DivRefProvider>
                                                    </>
                                                )
                                            }
                                        }
                                    </BottomSheetModalProviderFn>
                                </CartProvider>
                        
                        )
                    })
                }
            </div>
            <div ref={divRef} className="w-full scrollbar-hide"></div>
        </div>
    )
}