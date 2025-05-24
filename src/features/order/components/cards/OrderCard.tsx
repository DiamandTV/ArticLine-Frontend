import { Cart } from "@features/cart/compositions/Cart";
import { CartProvider } from "@features/cart/context/CartContext/CartProvider";
import { Order } from "@features/order/compositions/Order";
import { useOrderContext } from "@features/order/context/OrderContext/OrderProvider";
import { Store } from "@features/store/compositions/Store";
import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Card } from "react-bootstrap";
import { IoAlertCircleOutline } from "react-icons/io5";

type OrderCardProps = React.HTMLAttributes<HTMLElement>;

export function OrderIntroCard(attr: OrderCardProps) {
  const { order } = useOrderContext();
  if (!order) return null;

  const isUrgent = order.request_earliest_delivery;

  return (
    <Card
      {...attr}
      className={tailwindMerge(
        "w-full rounded-lg bg-white border border-gray-200 shadow-sm flex flex-row overflow-hidden hover:shadow-md transition-shadow h-full",
        attr.className
      )}
    >
      <StoreProvider store={order.cart.store}>
        {/* Immagine */}
        <Store.Image className="h-22 w-60 object-cover rounded-l-lg" />

        {/* Dettagli */}
        <Card.Footer className="flex flex-col gap-0 justify-between px-2 py-2 w-full bg-gray-50 rounded-r-lg">
          {/* Riga 1: Titolo + Stato */}
          <div className="w-full flex items-start justify-between ">
            <Store.Title className="text-base font-semibold text-gray-800" />
            <Order.StatusChip />
          </div>

          {/* Riga 2: Dettagli ordine */}
          <CartProvider cart={order.cart}>
            <div className="flex justify-between items-end w-full text-sm ">
              {/* Info consegna */}
              <div className="flex flex-col gap-1 text-gray-600">
                <div className="w-full flex flex-row items-center justify-start gap-1">
                  <Order.DeliveryIcon />
                  <Order.DeliveryTime className="font-normal"/>
                </div>
                <div className="text-xs text-gray-500">
                  Ordine: {new Date(order.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                {isUrgent && (
                  <div className="flex items-center text-orange-red text-xs font-semibold">
                    <IoAlertCircleOutline className="mr-1" /> Urgente
                  </div>
                )}
              </div>

              {/* Prezzo */}
              <Cart.Price className="text-base font-semibold text-gray-800" />
            </div>
          </CartProvider>
        </Card.Footer>
      </StoreProvider>
    </Card>
  );
}

export function OrderBusinessIntroCard(attr:OrderCardProps){
  const {order} = useOrderContext()
  if(!order) return null

  switch(order.status){
    case 'NOT ACCEPTED':
      return <OrderBusinessNotAccepted/>
    case 'ACCEPTED' :
    case 'WORKING ON':
    case 'READY':
      return <OrderBusinessInProgress/>
    
  }
}

export function  OrderBusinessNotAccepted(attr: OrderCardProps) {
  const { order } = useOrderContext();
  if (!order) return null;

  const isUrgent = order.request_earliest_delivery;

  return (
    <Card
      {...attr}
      className={tailwindMerge(
        "w-full rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow h-full",
        attr.className
      )}
    >
      <div className="w-full  h-full rounded-t-lg bg-white border flex flex-row overflow-hidden ">
        <StoreProvider store={order.cart.store}>
          {/* Immagine */}
          <Store.Image className={`h-22 w-60 object-cover rounded-tl-lg`} />

          {/* Dettagli */}
          <Card.Footer className="flex flex-col gap-0 justify-between px-2 py-2 w-full bg-gray-50 rounded-r-lg">
            {/* Riga 1: Titolo + Stato */}
            <div className="w-full flex items-start justify-between ">
              <Store.Title className="text-base font-semibold text-gray-800" />
              <Order.StatusChip />
            </div>

            {/* Riga 2: Dettagli ordine */}
            <CartProvider cart={order.cart}>
              <div className="flex justify-between items-end w-full text-sm ">
                {/* Info consegna */}
                <div className="flex flex-col gap-1 text-gray-600">
                  <div className="w-full flex flex-row items-center justify-start gap-1">
                    <Order.DeliveryIcon />
                    <Order.DeliveryTime className="font-normal"/>
                  </div>
                  <div className="text-xs text-gray-500">
                    Ordine: {new Date(order.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                  {isUrgent && (
                    <div className="flex items-center text-orange-red text-xs font-semibold">
                      <IoAlertCircleOutline className="mr-1" /> Urgente
                    </div>
                  )}
                </div>

                {/* Prezzo */}
                <Cart.Price className="text-base font-semibold text-gray-800" />
              </div>
            </CartProvider>
          </Card.Footer>
        </StoreProvider>
      </div>
      {
      <div className="w-full flex flex-row justify-center items-center p-2 gap-2">
        <Order.RefuseButton/>
        <Order.AcceptButton/>
      </div>
      }
    </Card>
  );
}

export function OrderBusinessInProgress(attr:OrderCardProps){
  const { order } = useOrderContext();
  if (!order) return null;

  const isUrgent = order.request_earliest_delivery;

  return (
    <Card
      {...attr}
      className={tailwindMerge(
        "w-full rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow h-full",
        attr.className
      )}
    >
      <div className="w-full  h-full rounded-t-lg bg-white border flex flex-row overflow-hidden ">
        <StoreProvider store={order.cart.store}>
          {/* Immagine */}
          <Store.Image className={`h-22 w-60 object-cover rounded-tl-lg`} />

          {/* Dettagli */}
          <Card.Footer className="flex flex-col gap-0 justify-between px-2 py-2 w-full bg-gray-50 rounded-r-lg">
            {/* Riga 1: Titolo + Stato */}
            <div className="w-full flex items-start justify-between ">
              <Store.Title className="text-base font-semibold text-gray-800" />
              <Order.StatusChip />
            </div>

            {/* Riga 2: Dettagli ordine */}
            <CartProvider cart={order.cart}>
              <div className="flex justify-between items-end w-full text-sm ">
                {/* Info consegna */}
                <div className="flex flex-col gap-1 text-gray-600">
                  <div className="w-full flex flex-row items-center justify-start gap-1">
                    <Order.DeliveryIcon />
                    <Order.DeliveryTime className="font-normal"/>
                  </div>
                  <div className="text-xs text-gray-500">
                    Ordine: {new Date(order.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                  {isUrgent && (
                    <div className="flex items-center text-orange-red text-xs font-semibold">
                      <IoAlertCircleOutline className="mr-1" /> Urgente
                    </div>
                  )}
                </div>

                {/* Prezzo */}
                <Cart.Price className="text-base font-semibold text-gray-800" />
              </div>
            </CartProvider>
          </Card.Footer>
        </StoreProvider>
      </div>
      {
      <div className="w-full flex flex-row justify-center items-center p-2 gap-2">
        <Order.NextButton/>
      </div>
      }
    </Card>
  );
}