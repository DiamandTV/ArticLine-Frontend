import { BlurCard } from "../../components/Cards/BlurCard";
import { OrderList } from "../../components/Order/OrderList/OrderList";
import { OrderQuery } from "../../components/Order/OrderQuery/OrdersQuery";
import { PaginationProvider } from "../../components/Pagination/PaginationProvider";

export function Orders(){
    return(
        <PaginationProvider>
            <OrderQuery>
                <div>
                    <BlurCard>
                        <OrderList/>
                    </BlurCard>
                </div>
            </OrderQuery>
        </PaginationProvider>
    )
}