import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    "from_date_time":z.any(),
    "to_date_time":z.any()
})

type OrderBatchDataRangeDataField = z.infer<typeof schema>

export function OrderBatchDataFormProvider({children}:{children:React.ReactNode}){
    const methods = useForm<OrderBatchDataRangeDataField>({
        resolver:zodResolver(schema)
    })

    return(
        <FormProvider {...methods}>
            {children}
        </FormProvider>
    )
}