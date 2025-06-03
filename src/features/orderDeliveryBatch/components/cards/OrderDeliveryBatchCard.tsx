import { Profile } from "@features/autentication/compositions/Profile";
import { OrderDeliveryBatch } from "@features/orderDeliveryBatch/compositions/OrderDeliveyBatch";
import { useOrderDeliveryBatchContext } from "@features/orderDeliveryBatch/context/OrderDeliveryBatchContext/OrderDeliveryBatchProvider";
import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { Card } from "react-bootstrap";

export function OrderDeliveryBatchCard(attr: React.HTMLAttributes<HTMLElement>) {
  const { orderDeliveryBatch } = useOrderDeliveryBatchContext();

  if (!orderDeliveryBatch) return null;

  return (
    <Card
      {...attr}
      className={tailwindMerge(
        "w-full rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow h-full",
        attr.className
      )}
    >
      <div className="flex flex-row w-full h-full overflow-hidden bg-white border rounded-t-lg">
       
          <Profile.Image className="object-cover rounded-tl-lg h-22 w-60" />
          {/* Dettagli */}
          <Card.Footer className="flex flex-col gap-0.5 justify-between px-3 py-2 w-full bg-gray-50 rounded-r-lg">
            {/* Riga 1: Titolo + Stato */}
            <div className="flex items-start justify-between w-full">
              <span className="text-base font-semibold text-gray-800">{orderDeliveryBatch.title}</span>
              <OrderDeliveryBatch.StatusChip />
            </div>

            {/* Riga 2: Dettagli batch */}
            <div className="flex flex-col items-start justify-between w-full text-sm">
              {/* Info tempi */}
              <OrderDeliveryBatch.PickupTimeDetails />
              <OrderDeliveryBatch.PickupDelayDetails />
              
              <div className="flex flex-row items-center justify-between w-full">
                <OrderDeliveryBatch.BatchNumber />
                <span>
                  {orderDeliveryBatch.temperature_start_range}° - {orderDeliveryBatch.temperature_end_range}°
                </span>
              </div>
            </div>
          </Card.Footer>
     
      </div>

      {/* Azioni */}
      <div className="flex flex-row items-center justify-between w-full gap-2 px-3 py-2 bg-white border-t">
        <OrderDeliveryBatch.OrderList/>
        <OrderDeliveryBatch.OrdersListCountDetail />
        {/* Aggiungi qui eventuali pulsanti batch */}
      </div>
    </Card>
  );
}
