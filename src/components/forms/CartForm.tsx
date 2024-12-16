import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { OrderTimeInput } from "../inputs/OrderTimeInput/OrderTimeInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    request_earliest_delivery:z.boolean(),
    delivery_time:z.any()
})

type CartFormFields = z.infer<typeof schema>

export function CartForm(){
    const methods = useForm<CartFormFields>({
        resolver:zodResolver(schema)
    })

    const {handleSubmit} = methods
    const onSubmit:SubmitHandler<CartFormFields> = async (cartInfo)=>{
        console.log(cartInfo)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <OrderTimeInput/>
            </form>
        </FormProvider>
        
        
    )
}