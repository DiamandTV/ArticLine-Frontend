import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    "date_range":z.any()
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