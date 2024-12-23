import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useContext, useMemo } from "react";
import { StatusCard } from "../../cards/StatusCard";
import { OrderStatus } from "../../../models/Order";
import usePagination from "@mui/material/usePagination/usePagination";
import { PaginationContext } from "../../Pagination/PaginationContext";


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
    const {pageData} = useContext(PaginationContext)
    const rows = useMemo(()=>{
        
        return orders.map((order)=>{
            return {
                id:order.id!,
                company_name:order.cart.company_profile_name,
                store_name:order.cart.store_name,
                status:order.status,
                total:order.total_price!,
                created:order.created_at,
                delivery_time:!order.delivery_time && 'NOT YET',
                delivered_time:!order.delivered_time && 'NOT YET'
            }
    })
    },[orders])
    return(
        orders ?
            <div className="w-full flex flex-col justify-start gap-y-2">
                <DataGrid
                    columns={columns}
                    rows={rows}
                    rowCount={pageData?.number_of_pages}
                    filterMode="server"
                    paginationMode="server"
                    pagination={true}
                    autoPageSize={true}
                    paginationModel={{page:2,pageSize:10}}
                    paginationMeta={{
                        hasNextPage:false,
                        
                    }}
                />
            </div>
        : null
    )
}