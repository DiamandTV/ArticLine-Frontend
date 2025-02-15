import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useContext, useMemo } from "react";
import { PaginationContext } from "../../Pagination/PaginationContext";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { StatusCard } from "../../cards/StatusCard";
import { OrderStatus } from "../../../models/Order";
import dayjs from "dayjs";
import { tabeleStyleHeaders } from "../../../constraints";
import { OrderDataButton } from "../../buttons/OrderDataButton";

const columns:Array<GridColDef> = [
    {
        field:'id',
        headerName:'ORDER ID',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,    
    },
    {
        field:'store_name',
        headerName:'STORE NAME',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,
    },
    {
        field:'buyer_name',
        headerName:'BUYER NAME',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,
    },
    {
        field:'status',
        headerName:'STATUS',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,
        renderCell:(params)=> {
            return <StatusCard status={params.value as OrderStatus}/>
        },
    },
    {
        field:'total',
        headerName:'TOTAL',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,
    },
    {
        field:'created',
        headerName:'CREATED',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,
    },
    {
        field:'delivery_time',
        headerName:'DELIVERY TIME',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,
    },
    {
        field:'delivered_time',
        headerName:'DELIVERED TIME',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,
    },
    {
        field:'data',
        headerAlign:'center',
        align:'center',
        renderCell:(params)=>{
            return <OrderDataButton orderBatchId={params.value}/>
        }
    }
]

export function OrderCompanyList(){
    const companyNoActiveOrders = useSelector((state:RootState)=>state.orderReducer.companyNoActiveOrders)
    const {pageData,setPage} = useContext(PaginationContext)
    console.log(companyNoActiveOrders[0])
        const rows = useMemo(()=>{  
            return companyNoActiveOrders.map((order)=>{
                return {
                    id:order.id!,
                    store_name:order.cart.store_name,
                    buyer_name:order.profile?.first_name+" "+order.profile?.last_name,
                    status:order.status,
                    total:order.total_price!,
                    created:dayjs(order.created_at).format('DD/MM/YY hh:mm'),
                    delivery_time:order.delivery_time ? dayjs(order.delivery_time).format('DD/MM/YY hh:mm') : 'NOT YET',
                    delivered_time:order.delivered_time ? dayjs(order.delivered_time).format('DD/MM/YY hh:mm') : 'NOT YET',
                    data:order.order_batch
                }
        })
        },[companyNoActiveOrders])
        return(
            companyNoActiveOrders ?
                <div className="w-full flex flex-col justify-start gap-y-2">
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        rowCount={pageData!.count}
                        filterMode="server"
                        paginationMode="server"
                        pagination
                        paginationModel={{page:pageData!.current_page_number-1,pageSize:pageData!.page_size}}
                        paginationMeta={{
                            hasNextPage:pageData!.next ? true : false,
                        }}
                        onPaginationMetaChange={()=>{
    
                        }}
                        onPaginationModelChange={(model)=>{
                            if(setPage){
                                setPage(model.page+1)
                            }
                        }}
                    />
                </div>
            : null
        )
}