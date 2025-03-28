import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useContext, useMemo } from "react";
import { PaginationContext } from "../../Pagination/PaginationContext";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { StatusOrderBatchCard } from "../../cards/StatusCard";
import { OrderBatchStatus } from "../../../models/Order";
import dayjs from "dayjs";
import { tabeleStyleHeaders } from "../../../constraints";
import { TextButton } from "../../Buttons/TextButtons";
import { Link, useNavigate } from "react-router-dom";
import { OrderDataButton, OrderDataButtonLink } from "../../buttons/OrderDataButton";





const columns:Array<GridColDef> = [
    {
        field:'id',
        headerName:'BATCH ID',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,    
    },
    {
        field:'company_name',
        headerName:'COMPANY NAME',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,
    },
    {
        field:'courier_name',
        headerName:'COURIER NAME',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,
    },
    {
        field:'device_code',
        headerName:'DEVICE MAC',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,
    },
    // {
    //     field:'status',
    //     headerName:'STATUS',
    //     headerAlign:'center',
    //     align:'center',
    //     ...tabeleStyleHeaders,
    //     renderCell:(params)=> {
    //         return <StatusCard status={params.value as OrderStatus}/>
    //     },
    // },
    {
        field:'picked_time',
        headerName:'PICK UP TIME',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,
    },
    {
        field:'pickedup_time',
        headerName:'PICKED UP TIME',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,
    },
    {
        field:'finished_time',
        headerName:'FINISHED TIME',
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
            return <StatusOrderBatchCard status={params.value as OrderBatchStatus}/>
        },
    },
    {
        field:'created',
        headerName:'CREATED',
        headerAlign:'center',
        align:'center',
        ...tabeleStyleHeaders,
    },
    {
        field:'data',
        headerName:'',
        headerAlign:'center',
        align:'center',
        //...tabeleStyleHeaders,
        renderCell:(params)=>{
            return (
                <OrderDataButtonLink link={`/order/batch/${params.value}/inactive/data`}/>
            )
        }
    },
]

export function OrderBatchList(){
    const noActiveOrderBatches = useSelector((state:RootState)=>state.orderReducer.companyNoActiveOrdersBatch)
    const {pageData,setPage} = useContext(PaginationContext)
    console.log(noActiveOrderBatches[0])
        const rows = useMemo(()=>{  
            return noActiveOrderBatches.map((orderBatch)=>{
                return {
                    id:orderBatch.id!,
                    company_name:orderBatch.company?.first_name+" "+orderBatch.company?.last_name,
                    courier_name:orderBatch.courier?.first_name+" "+orderBatch.courier?.last_name,
                    device_code:orderBatch.device?.code,
                    picked_time:orderBatch.pickup_time ? dayjs(orderBatch.pickup_time).format('DD/MM/YY hh:mm') : 'NOT YET',
                    pickedup_time: orderBatch.pickedup_time ? dayjs(orderBatch.pickedup_time).format('DD/MM/YY hh:mm') : 'NOT YET',
                    finished_time:orderBatch.finished_time ? dayjs(orderBatch.finished_time).format('DD/MM/YY hh:mm') : 'NOT YET',
                    status:orderBatch.status,
                    created:dayjs(orderBatch.created_at).format('DD/MM/YY hh:mm'),
                    data:orderBatch.id
                
                }
        })
        },[noActiveOrderBatches])
        return(
            noActiveOrderBatches ?
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

