import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { AnimationDateTimePicker } from "../inputs/DateTimePicker/AnimationDateTimePicker"
import { DeviceInput } from "../inputs/DeviceInput/DeviceInput"
import { CourierInput } from "../inputs/CourierInput/CourierInput"
import dayjs, { Dayjs } from "dayjs"
import { OrderPickerInput } from "../inputs/OrderPicker/OrderPicker"

const schema = z.object({
    id:z.coerce.number().optional(),
    title:z.string().min(1).max(255),
    //company:z.coerce.number(),
    device:z.object({
        id:z.coerce.number(),
        label:z.string().min(1).max(255).optional()
    }),
    courier:z.object({
        id:z.coerce.number(),
        label:z.string().min(1).max(255).optional()
    }),
    orders:z.object({
        ids:z.array(z.coerce.number()).min(0),
        label:z.string().optional()
    }),
    pickup_time:z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date').optional()
})

export type OrderBatchFormFields = z.infer<typeof schema>

interface OrderBatchFormProps{
    onSubmitForm:(orderBatchInfo:OrderBatchFormFields)=>Promise<Record<string,string> | null>,
    children:React.ReactNode,
    defaultValue?:OrderBatchFormFields

}

export function OrderBatchForm({onSubmitForm,children,defaultValue}:OrderBatchFormProps){
    const control =  useForm<OrderBatchFormFields>({
        resolver:zodResolver(schema),
        defaultValues:defaultValue ?? null
    })
    const {register,handleSubmit,formState:{errors},getValues} = control
    const onSubmit:SubmitHandler<OrderBatchFormFields> = async (orderBatchInfo) =>{
        console.log(orderBatchInfo)
        const errors = await onSubmitForm(orderBatchInfo)
        console.log(errors)
    }
    console.log(errors)
    return (
        <FormProvider {...control}>
            <form
            className="w-full h-full flex flex-col justify-between items-center "
            onSubmit={handleSubmit(onSubmit)}>   
                <div className="w-full grid grid-cols-1 md:grid-cols-1 justify-center items-start gap-y-10 gap-x-4 pb-8 text-white">
                    <AnimationPlaceholderInput
                        name="title"
                        labelName="TITLE"
                        type="text"
                        register={register('title')}
                        error={errors.title}
                        defaultValue={getValues('title')}
                    />
                          
                    <AnimationDateTimePicker
                        labelName="PICK UP TIME"
                        type="text"
                        name="pickup_time"
                    />
                    <DeviceInput
                        name="device"
                        labelName="DEVICE"
                        register={register('device')}
                        onChange={()=>{}}
                    />
                    <CourierInput
                        name="courier"
                        labelName="COURIER"
                        register={register('courier')}
                        onChange={()=>{
                        }}
                    />
                    <OrderPickerInput
                        name="orders"
                        labelName="ORDERS"
                        register={register('orders')}            
                        onChange={()=>{
                            
                        }}
                    />
                    {children}
                </div>
            </form>
        </FormProvider>
    )
}


