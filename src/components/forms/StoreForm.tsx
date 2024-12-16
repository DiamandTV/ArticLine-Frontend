import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'
import { AddressInput } from "../inputs/AddressInput/AddressInput"
import { StoreInfo } from "./StoreInfo"
import { StoreImageForm } from "./StoreImageForm"
import { StoreModel } from "../../models/store"
const schema = z.object({
    images:z.array(
        z.object({
            id:z.coerce.number().optional(),
            image:z.string().min(1)
        })
    ).min(1),
    title:z.string(),
    description:z.string(),
    categories:z.array(z.coerce.number()).min(1),
    address:z.object({
        //id:z.coerce.number().optional(),
        recipient_name: z.string().min(1).max(255),
        street: z.string().min(1).max(255),
        city: z.string().min(1).max(255),
        postal_code: z.string(),
        province: z.string().min(1).max(255),
        country: z.string().min(1).max(255),
        
        // recipient_name: z.string(),
        // street: z.string(),
        // city: z.string(),
        // postal_code: z.string(),
        // province: z.string(),
        // country: z.string(),
    })
})

export type StoreFormFields = z.infer<typeof schema>

interface StoreFormProps{
    onSubmitForm:(storeInfo:StoreFormFields)=>Promise<Record<string,string> | null>,
    children:React.ReactNode,
    store?:StoreModel, //defaultValue
}

export function StoreForm({onSubmitForm,children,store}:StoreFormProps){
    const methods = useForm<StoreFormFields>({
        resolver:zodResolver(schema),
        defaultValues:store as StoreFormFields 
    })

    const onSubmit:SubmitHandler<StoreFormFields> = async (storeInfo) => {
        const errors = await onSubmitForm(storeInfo)
        console.log(errors)
        if(errors){
            Object.entries(errors).forEach(([key,value])=>{
                methods.setError(key,{type:"custom",message:value[0]})
            })
        }
    }

    return(
        <FormProvider {...methods}>
            <form 
            className="w-full"
            onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="w-full grid grid-cols-1 md:grid-cols-1 justify-center items-center gap-y-8 gap-x-4  pb-8" >
                    <StoreImageForm/>
                    <StoreInfo/>
                    <AddressInput/>
                </div>
                {children}
            </form>
        </FormProvider>
    )
}