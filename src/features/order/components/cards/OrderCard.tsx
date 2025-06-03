// import { Cart } from "@features/cart/compositions/Cart";
// import { CartProvider } from "@features/cart/context/CartContext/CartProvider";
// import { Order } from "@features/order/compositions/Order";
// import { useOrderContext } from "@features/order/context/OrderContext/OrderProvider";
// import { Store } from "@features/store/compositions/Store";
// import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider";
// import { tailwindMerge } from "@lib/tsMerge/tsMerge";
// import { Card } from "react-bootstrap";
// import { IoAlertCircleOutline } from "react-icons/io5";

// type OrderCardProps = React.HTMLAttributes<HTMLElement>;

// export function OrderIntroCard(attr: OrderCardProps) {
//   const { order } = useOrderContext();
//   if (!order) return null;

//   const isUrgent = order.request_earliest_delivery;

//   return (
//     <Card
//       {...attr}
//       className={tailwindMerge(
//         "w-full rounded-lg bg-white border border-gray-200 shadow-sm flex flex-row overflow-hidden hover:shadow-md transition-shadow h-full",
//         attr.className
//       )}
//     >
//       <StoreProvider store={order.cart.store}>
//         {/* Immagine */}
//         <Store.Image className="h-22 w-60 object-cover rounded-l-lg" />

//         {/* Dettagli */}
//         <Card.Footer className="flex flex-col gap-0 justify-between px-2 py-2 w-full bg-gray-50 rounded-r-lg">
//           {/* Riga 1: Titolo + Stato */}
//           <div className="w-full flex items-start justify-between ">
//             <Store.Title className="text-base font-semibold text-gray-800" />
//             <Order.StatusChip />
//           </div>

//           {/* Riga 2: Dettagli ordine */}
//           <CartProvider cart={order.cart}>
//             <div className="flex justify-between items-end w-full text-sm ">
//               {/* Info consegna */}
//               <div className="flex flex-col gap-1 text-gray-600">
//                 <div className="w-full flex flex-row items-center justify-start gap-1">
//                   <Order.DeliveryIcon />
//                   <Order.DeliveryTime className="font-medium text-xs" />
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   Ordine: {new Date(order.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                 </div>
//                 {isUrgent && (
//                   <div className="flex items-center text-orange-red text-xs font-semibold">
//                     <IoAlertCircleOutline className="mr-1" /> Urgente
//                   </div>
//                 )}
//               </div>

//               {/* Prezzo */}
//               <Cart.Price className="text-base font-semibold text-gray-800" />
//             </div>
//           </CartProvider>
//         </Card.Footer>
//       </StoreProvider>
//     </Card>
//   );
// }

// export function OrderBusinessIntroCard(attr:OrderCardProps){
//   const {order} = useOrderContext()
//   if(!order) return null

//   switch(order.status){
//     case 'NOT ACCEPTED':
//       return <OrderBusinessNotAccepted {...attr}/>
//     case 'ACCEPTED' :
//     case 'WORKING ON':
//     case 'READY':
//       return <OrderBusinessInProgress {...attr}/>
    
//   }
// }

// export function  OrderBusinessNotAccepted(attr: OrderCardProps) {
//   const { order } = useOrderContext();
//   if (!order) return null;

//   return (
//     <Card
//       {...attr}
//       className={tailwindMerge(
//         "w-full rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow h-full",
//         attr.className
//       )}
//     >
//       <div className="w-full  h-full rounded-t-lg bg-white border flex flex-row overflow-hidden ">
//         <StoreProvider store={order.cart.store}>
//           {/* Immagine */}
//           <Store.Image className={`h-22 w-60 object-cover rounded-tl-lg`} />

//           {/* Dettagli */}
//           <Card.Footer className="flex flex-col gap-0 justify-between px-2 py-2 w-full bg-gray-50 rounded-r-lg">
//             {/* Riga 1: Titolo + Stato */}
//             <div className="w-full flex items-start justify-between ">
//               <Store.Title className="text-base font-semibold text-gray-800" />
//               <Order.StatusChip />
//             </div>

//             {/* Riga 2: Dettagli ordine */}
//             <CartProvider cart={order.cart}>
//               <div className="flex justify-between items-end w-full text-sm ">
//                 {/* Info consegna */}
//                 <div className="flex flex-col gap-1 text-gray-600">
//                   <div className="w-full flex flex-row items-center justify-start gap-1">
//                     <Order.DeliveryIcon />
//                     <Order.DeliveryTime className="font-medium text-xs" />
//                   </div>
//                   <Order.OrderNumber/>
//                   <Order.Urgent/>
//                 </div>

//                 {/* Prezzo */}
//                 <Cart.Price className="text-base font-semibold text-gray-800" />
//               </div>
//             </CartProvider>
//           </Card.Footer>
//         </StoreProvider>
//       </div>
//       {
//       <div className="w-full flex flex-row justify-center items-center p-2 gap-2">
//         <Order.RefuseButton/>
//         <Order.AcceptButton/>
//       </div>
//       }
//     </Card>
//   );
// }
// export function OrderBusinessInProgress(attr: React.HTMLAttributes<HTMLElement>) {
//   const { order } = useOrderContext();

//   if (!order) return null;
//   console.log(order)
//   return (
//     <>
//       <Card
//         {...attr}
//         className={tailwindMerge(
//           "w-full rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow h-full",
//           attr.className
//         )}
//       >
//         <div className="w-full h-full rounded-t-lg bg-white border flex flex-row overflow-hidden">
//           <StoreProvider store={order.cart.store}>
//             {/* Immagine */}
//             <Store.Image className="h-22 w-60 object-cover rounded-tl-lg" />

//             {/* Dettagli */}
//             <Card.Footer className="flex flex-col gap-0.5 justify-between px-3 py-2 w-full bg-gray-50 rounded-r-lg">
//               {/* Riga 1: Titolo + Stato */}
//               <div className="w-full flex items-start justify-between">
//                 <Store.Title className="text-base font-semibold text-gray-800" />
//                 <Order.StatusChip />
//               </div>

//               {/* Riga 2: Dettagli ordine */}
//               <CartProvider cart={order.cart}>
//                 <div className="flex flex-col justify-between items-start w-full text-sm">
//                   {/* Info consegna */}
//                   <div className="w-f">
//                     <Order.DeliveryTimeDetails/>
//                     <Order.DelayTimeDetails/>
//                   </div>
//                   <div className="w-full flex flex-row justify-between items-center">
//                     <Order.OrderNumber/>
//                     <Cart.Price/>
//                   </div>
//                   {/* Prezzo */}
                 
//                 </div>
//               </CartProvider>
//             </Card.Footer>
//           </StoreProvider>
//         </div>

//         {/* Azioni */}
//         <div className="w-full flex flex-row justify-between items-center px-3 py-2 gap-2 bg-white border-t">
//           <Order.DelayButton/>
//           <Order.NextButton />
//         </div>
//       </Card>

      
//     </>
//   );
// }

import { Cart } from "@features/cart/compositions/Cart";
import { CartProvider } from "@features/cart/context/CartContext/CartProvider";
import { Order } from "@features/order/compositions/Order";
import { useOrderContext } from "@features/order/context/OrderContext/OrderProvider";
import { Store } from "@features/store/compositions/Store";
import { StoreProvider } from "@features/store/context/StoreContext/StoreProvider";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Card } from "react-bootstrap";

type OrderCardProps = React.HTMLAttributes<HTMLElement>;

export function OrderIntroCard(attr: OrderCardProps) {
  const { order } = useOrderContext();
  if (!order) return null;

  const isUrgent = order.request_earliest_delivery;

  return (
    <Card
      {...attr}
      className={tailwindMerge(
        "w-full rounded-lg bg-white border border-gray-200 shadow-sm flex flex-row overflow-hidden hover:shadow-md transition-shadow",
        attr.className
      )}
    >
      <StoreProvider store={order.cart.store}>
        <Store.Image className="h-28 w-64 object-cover rounded-l-lg" />

        <div className="flex flex-col justify-between px-3 py-2 w-full bg-gray-50 rounded-r-lg">
          <div className="flex justify-between items-start w-full">
            <Store.Title className="text-base font-semibold text-gray-800" />
            <Order.StatusChip />
          </div>

          <CartProvider cart={order.cart}>
            <div className="flex flex-col justify-between text-sm text-gray-700 gap-1 mt-2">
              <Order.DeliveryTimeDetails />
              {isUrgent && <Order.Urgent />}
              <Order.OrderNumber />
              <Cart.Price className="text-base font-semibold text-gray-800 mt-2" />
            </div>
          </CartProvider>
        </div>
      </StoreProvider>
    </Card>
  );
}

export function OrderBusinessIntroCard(attr: OrderCardProps) {
  const { order } = useOrderContext();
  if (!order) return null;

  switch (order.status) {
    case "NOT ACCEPTED":
      return <OrderBusinessNotAccepted {...attr} />;
    case "ACCEPTED":
    case "WORKING ON":
    case "READY":
      return <OrderBusinessInProgress {...attr} />;
  }
}

export function OrderBusinessNotAccepted(attr: OrderCardProps) {
  const { order } = useOrderContext();
  if (!order) return null;

  return (
    <Card
      {...attr}
      className={tailwindMerge(
        "w-full rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow",
        attr.className
      )}
    >
      <div className="flex flex-row bg-white">
        <StoreProvider store={order.cart.store}>
          <Store.Image className="h-28 w-64 object-cover rounded-l-lg" />

          <div className="flex flex-col justify-between px-3 py-2 w-full bg-gray-50 rounded-r-lg">
            <div className="flex justify-between items-start w-full">
              <Store.Title className="text-base font-semibold text-gray-800" />
              <Order.StatusChip />
            </div>

            <CartProvider cart={order.cart}>
              <div className="flex flex-col text-sm text-gray-700 gap-1 mt-2">
                <Order.DeliveryTimeDetails />
                <Order.DelayTimeDetails />
            
                <Order.OrderNumber />
                <Order.Urgent />

                <Order.CreatedAt/>

                <Cart.Price className="text-base font-semibold text-gray-800 mt-2" />
              </div>
            </CartProvider>
          </div>
        </StoreProvider>
      </div>

      <div className="w-full flex flex-row justify-center items-center gap-2 p-2 border-t">
        <Order.RefuseButton />
        <Order.AcceptButton />
      </div>
    </Card>
  );
}


export function OrderBusinessInProgress(attr: OrderCardProps) {
  const { order } = useOrderContext();
  if (!order) return null;

  return (
    <Card
      {...attr}
      className={tailwindMerge(
        "w-full rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow",
        attr.className
      )}
    >
      <div className="flex flex-row bg-white">
        <StoreProvider store={order.cart.store}>
          <Store.Image className="min-h-32 max-h-40 w-64 object-cover rounded-tl-lg" />

          <div className="flex flex-col justify-between px-3 py-2 w-full bg-gray-50 rounded-r-lg">
            <div className="flex justify-between items-start w-full">
              <Store.Title className="text-base font-semibold text-gray-800" />
              <Order.StatusChip />
            </div>

            <CartProvider cart={order.cart}>
              <div className="flex flex-col text-sm text-gray-700 gap-1 mt-2">
                <Order.DeliveryTimeDetails />
                <Order.DelayTimeDetails />
                <Order.OrderNumber />
                <Order.CreatedAt/>
                <Cart.Price className="self-end text-base font-semibold text-gray-800 " />
              </div>
            </CartProvider>
          </div>
        </StoreProvider>
      </div>

      <div className="w-full flex flex-row justify-between items-center px-3 py-2 gap-2 border-t bg-white">
        <Order.DelayButton />
        <Order.NextButton />
      </div>
    </Card>
  );
}
