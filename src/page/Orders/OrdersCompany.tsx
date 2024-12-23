import { OrderCompanyActive } from "../../components/OrderCompany/OrderCompanyActive";
import { PaginationProvider } from "../../components/Pagination/PaginationProvider";

export function OrdersCompany(){
    return(
        <PaginationProvider>
            <OrderCompanyActive/>
        </PaginationProvider>
    )
}