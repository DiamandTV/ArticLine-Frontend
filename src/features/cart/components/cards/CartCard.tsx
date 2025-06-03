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
        <Cart.Card className="w-full rounded-none md:rounded-lg">
            {
            // <Cart.Header className="flex flex-row items-center justify-between px-2 py-3 ">
            //     <div className="flex flex-row items-center gap-2 w-max">
            //         <BackButton className="p-2 text-lg"/>
            //         <h1 className="text-lg font-semibold text-surface-30">Continue shopping</h1>
            //     </div>
            //     <Cart.ItemsCount/>
            // </Cart.Header>
            }
            <Cart.Body className="flex flex-col w-full gap-2 p-2 pb-0">
                {
                    readonly ? <CartItem.ListReadOnly/> : <CartItem.List/>
                }
            </Cart.Body>
            <Cart.Footer className="flex flex-col gap-2 p-2 mt-0">
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
            <Cart.Footer className="flex flex-col gap-2 p-2 mt-0">
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
        <Store.Image className="object-cover rounded-l-lg h-22 w-60" />

        {/* Dettagli */}
        <Card.Footer className="flex flex-col justify-between w-full h-full gap-3 px-3 py-2 pl-3 pr-4 rounded-r-lg bg-gray-50">
          {/* Riga superiore: Titolo + articoli */}
          <div className="flex items-start justify-between text-sm">
            <Store.Title className="text-base truncate max-w-[60%]" />
            <div className="flex items-center gap-1 text-gray-600">
              <IoCart className="text-base" />
              <span>{cart.cartItems_count}</span>
            </div>
          </div>

          {/* Riga inferiore: Prezzo + spedizione */}
          <div className="flex items-end justify-between text-xs text-gray-600">
            <div className="flex flex-col w-full gap-1">
                <Cart.SubTotalCost/>
                <Cart.ShippingCost/>
                <Cart.TotalCost className="text-sm"/>
            </div>
          </div>
        </Card.Footer>
      </StoreProvider>
    </Cart.Card>
  );
}
