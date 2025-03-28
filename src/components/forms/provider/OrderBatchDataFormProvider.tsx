import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { OrderBatchContext } from "../../OrderCompanyBatch/OrderBatchContext/OrderBatchContext";
import dayjs from "dayjs";
import { OrderContext } from "../../OrderCompany/OrderContext/OrderContext";

const schema = z.object({
    "from_date_time":z.any(),
    "to_date_time":z.any(),
})

type OrderBatchDataRangeDataField = z.infer<typeof schema>

export function OrderBatchDataFormProvider({children}:{children:React.ReactNode}){
    const {orderBatch} = useContext(OrderBatchContext)
    const methods = useForm<OrderBatchDataRangeDataField>({
        resolver:zodResolver(schema),
        defaultValues:{
            'from_date_time':dayjs(orderBatch?.pickedup_time),
            'to_date_time':orderBatch?.finished_time ? dayjs(orderBatch?.finished_time) : dayjs()
        }
    })

    return(
        <FormProvider {...methods}>
            {children}
        </FormProvider>
    )
}

export function OrderDataFormProvider({children}:{children:ReactNode}) {
    const {order} = useContext(OrderContext)
    const methods = useForm<OrderBatchDataRangeDataField>({
        resolver:zodResolver(schema),
        defaultValues:{
            'from_date_time':dayjs(order?.pickedup_time),
            'to_date_time':order?.delivered_time ? dayjs(order?.delivered_time) : dayjs()
        }
    })

    return(
        <FormProvider {...methods}>
            {children}
        </FormProvider>
    )
}