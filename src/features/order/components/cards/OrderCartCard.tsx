import { OnlyCartDetailCard } from "@features/cart/components/cards/CartCard";


export function OrderCartCard(){
    return(
        <div className="flex flex-col gap-2">
            <h1 className="py-1 font-medium">CART</h1>
            <OnlyCartDetailCard/>
        </div>
    )
}