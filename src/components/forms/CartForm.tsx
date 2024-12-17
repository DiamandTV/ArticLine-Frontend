import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { OrderTimeInput } from "../inputs/OrderTimeInput/OrderTimeInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextButton } from "../Buttons/TextButtons";
import { AddressFormReadOnly } from "./AddressFormReadonly";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const schema = z.object({
    request_earliest_delivery:z.boolean(),
    delivery_time:z.any()
})

type CartFormFields = z.infer<typeof schema>

export function CartForm(){
    const profile = useSelector((state:RootState)=>state.profileReduce.profile)
    const methods = useForm<CartFormFields>({
        resolver:zodResolver(schema)
    })

    const {handleSubmit} = methods
    const onSubmit:SubmitHandler<CartFormFields> = async (cartInfo)=>{
        console.log(cartInfo)
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col gap-y-4 ">
                <h2 className="text-2xl text-center font-semibold">DELIVERY TIME</h2>
                <OrderTimeInput/>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-11 gap-x-4 py-10">
                    <h1 className="text-2xl text-center col-span-2 font-semibold">DELIVERY ADDRESS</h1>
                    <AddressFormReadOnly address={profile!.address}/>
                </div>
                <TextButton
                    className="mt-auto"
                    text="ORDER"
                    onClick={()=>{

                    }}
                />
            </form>
        </FormProvider>
        
        
    )
}