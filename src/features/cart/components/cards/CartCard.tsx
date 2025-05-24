import { Cart } from "@features/cart/compositions/Cart";
import { CartItem } from "@features/cart/compositions/CartItem";
import { useCartContext } from "@features/cart/context/CartContext/CartProvider";
import { Store } from "@features/store/compositions/Store";
import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Card } from "react-bootstrap";
import { IoCart } from "react-icons/io5";


interface CardCardProps{
    readonly?:boolean
}
export function CartCard({readonly=false}:CardCardProps) {
    const {cart} = useCartContext()
    if(!cart) return null
    return (
        <Cart.Card className="w-full rounded-none">
            {
            // <Cart.Header className="px-2 py-3 flex flex-row justify-between items-center ">
            //     <div className="w-max flex flex-row items-center gap-2">
            //         <BackButton className="text-lg p-2"/>
            //         <h1 className="text-lg font-semibold text-surface-30">Continue shopping</h1>
            //     </div>
            //     <Cart.ItemsCount/>
            // </Cart.Header>
            }
            <Cart.Body className="flex flex-col gap-2 p-2 pb-0">
                {
                    readonly ? <CartItem.ListReadOnly/> : <CartItem.List/>
                }
            </Cart.Body>
            <Cart.Footer className="mt-0 p-2 flex flex-col gap-2">
                <Cart.PriceDetails/>
                <Cart.Checkout/>
            </Cart.Footer>
        </Cart.Card>
    );
}


export function OnlyCartDetailCard(attr:React.HTMLAttributes<HTMLElement>){
    const {cart} = useCartContext()
    if(!cart) return null
    return (
        <Cart.Card {...attr} className={tailwindMerge("w-full ",attr.className)}>        
            <Cart.Body className="flex flex-col gap-2 p-2 pb-0">
              <CartItem.ListReadOnly/>
            </Cart.Body>
            <Cart.Footer className="mt-0 p-2 flex flex-col gap-2">
                <Cart.PriceDetails/>
            </Cart.Footer>
        </Cart.Card>
    );
}

export function CartIntroCard(attr:React.HTMLAttributes<HTMLElement>) {
  const { cart } = useCartContext();
  if (!cart) return null;

  return (
    <Cart.Card {...attr} className={tailwindMerge("w-full flex flex-row h-full rounded-lg border border-gray-200 overflow-hidden bg-white hover:shadow-md transition-shadow duration-300",attr.className)}>
      <StoreProvider store={cart.store}>
        {/* Immagine negozio */}
        <Store.Image className="h-22 w-60 object-cover rounded-l-lg" />

        {/* Dettagli */}
        <Card.Footer className="flex flex-col gap-3 justify-between px-2 py-2 pl-3 pr-4 w-full h-full rounded-r-lg bg-gray-50">
          {/* Riga superiore: Titolo + articoli */}
          <div className="flex justify-between items-start text-sm">
            <Store.Title className="text-base truncate max-w-[60%]" />
            <div className="flex items-center gap-1 text-gray-600">
              <IoCart className="text-base" />
              <span>{cart.cartItems_count}</span>
            </div>
          </div>

          {/* Riga inferiore: Prezzo + spedizione */}
          <div className="flex justify-between items-end text-xs text-gray-600">
            <div className="w-full flex flex-col ">
                <Cart.SubTotalCost/>
                <Cart.ShippingCost/>
                <Cart.TotalCost/>
            </div>
          </div>
        </Card.Footer>
      </StoreProvider>
    </Cart.Card>
  );
}
