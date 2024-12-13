import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'
import { StoreCategory } from "../../page/Store/StoreCategory"
import { ImagePicker } from "../inputs/ImagePicker/ImagePicker"
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { AnimationPlaceholderTextArea } from "../inputs/AnimationPlaceholderTextArea"

const schema = z.object({
    /*
    image:z.string().min(1),
    name:z.string().min(1),
    description:z.string().min(1)
    */
    image:z.string().min(1),
    name:z.string(),
    description:z.string()
})

export type StoreCategoryFields = z.infer<typeof schema>

interface StoreCategoryFormProps{
    onSubmitForm:(productInfo:StoreCategoryFields)=>Promise<Record<string,string> | null>,
    children:React.ReactNode
}
export function StoreCategoryForm({children,onSubmitForm}:StoreCategoryFormProps){
    const {handleSubmit,control,register,formState:{errors},setValue,getValues,setError} = useForm<StoreCategoryFields>({
        resolver:zodResolver(schema)
    })

    const onSubmit:SubmitHandler<StoreCategoryFields> = async (storeCategoryInfo)=>{
        const errors = await onSubmitForm(storeCategoryInfo)
        if(errors){
            Object.entries(errors).forEach(([key,value])=>{
                setError(key,{type:"custom",message:value[0]})
            })
        }
    }

    
    return(
        <form
        className="w-full h-full flex flex-col justify-between items-center "
        onSubmit={handleSubmit(onSubmit)}>   
            <div className="w-full grid grid-cols-1 md:grid-cols-1 justify-center items-start gap-y-10 gap-x-4 pb-8">
                <div className="w-full">
                    <Controller 
                        name="image"
                        control={control} 
                        defaultValue={getValues('image')} 
                        render={({field:{value}})=>{
                            return (
                                <ImagePicker
                                error={errors.image}
                                image={value}
                                setImage={(image)=>setValue('image',image)}
                                className="w-96"
                            />
                            )
                        }}/>
                  
                </div>
                <div className="w-full h-full flex flex-col gap-y-10 gap-x-4 pb-8">
                    <AnimationPlaceholderInput
                        labelName="NAME"
                        name="name"
                        type="text"
                        register={register('name')}
                        error={errors.name}
                        defaultValue={getValues('name')}
                    />

                    <AnimationPlaceholderTextArea
                        labelName="DESCRIPTION"
                        name="description"
                        register={register('description')}
                        error={errors.description}
                        defaultValue={getValues('description')}
                        className="max-h-32"
                    />
                </div>
                
            </div>
            <div className="w-full justify-self-end self-end flex flex-col justify-center items-end mt-auto">
                {children}
            </div>
        </form>
    )
}