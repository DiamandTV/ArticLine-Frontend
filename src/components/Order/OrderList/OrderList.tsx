import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useContext, useMemo } from "react";
import { StatusCard } from "../../cards/StatusCard";
import { OrderStatus } from "../../../models/Order";
import { PaginationContext } from "../../Pagination/PaginationContext";
import dayjs from "dayjs";


interface OrderTableModel{
    id:string,
    company_name:string,
    store_name:string,
    status:string,
    total:number,
    created:string,
    delivery_time:string,
    delivered_time:string
}

const styleHeaders = {
    flex:1,
    autoHeight: true,
    wrapText:true,
    resizable: true,
    wrapHeaderText: true, // Wrap Text
    autoHeaderHeight: true, // Adj
    cellClassName:"font-thin text-white text-md",
    headerClassName:"text-md font-bold text-black"
}


const columns:Array<GridColDef> = [
    {
        field:'id',
        headerName:'ORDER ID',
        headerAlign:'center',
        align:'center',
        ...styleHeaders,    
    },
    {
        field:'company_name',
        headerName:'COMPANY NAME',
        headerAlign:'center',
        align:'center',
        ...styleHeaders,
    },
    {
        field:'store_name',
        headerName:'STORE NAME',
        headerAlign:'center',
        align:'center',
        ...styleHeaders,
    },
    {
        field:'status',
        headerName:'STATUS',
        headerAlign:'center',
        align:'center',
        ...styleHeaders,
        renderCell:(params)=> {
            return <StatusCard status={params.value as OrderStatus}/>
        },
    },
    {
        field:'total',
        headerName:'TOTAL',
        headerAlign:'center',
        align:'center',
        ...styleHeaders,
    },
    {
        field:'created',
        headerName:'CREATED',
        headerAlign:'center',
        align:'center',
        ...styleHeaders,
    },
    {
        field:'delivery_time',
        headerName:'DELIVERY TIME',
        headerAlign:'center',
        align:'center',
        ...styleHeaders,
    },
    {
        field:'delivered_time',
        headerName:'DELIVERED TIME',
        headerAlign:'center',
        align:'center',
        ...styleHeaders,
    }
]

export function OrderList(){
    const orders = useSelector((state:RootState)=>state.orderReducer.orders)
    const {pageData,setPage} = useContext(PaginationContext)
    console.log(orders)
    const rows = useMemo(()=>{
        
        return orders.map((order)=>{
            return {
                id:order.id!,
                company_name:order.cart.company_profile_name,
                store_name:order.cart.store_name,
                status:order.status,
                total:order.total_price!,
                created:dayjs(order.created_at).format('DD/MM/YY hh:mm'),
                delivery_time:order.delivery_time ? dayjs(order.delivery_time).format('DD/MM/YY hh:mm') : 'NOT YET',
                delivered_time:order.delivered_time ? dayjs(order.delivered_time).format('DD/MM/YY hh:mm') : 'NOT YET'
            }
    })
    },[orders])
    return(
        orders ?
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