// PRODUCT CREATE FORM
import { zodResolver } from "@hookform/resolvers/zod"
import { Slider } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { AnimationPlaceholderTextArea } from "../inputs/AnimationPlaceholderTextArea"
import { FixedSizeDropdown } from "../inputs/Dropdown/FixedSizeDropdown"
import { StoreCategoriesModel } from "../../models/StoreCategories"
import { MINIMUM_TEMPERATURE_RANGE } from "../../constraints"
import { ImagePicker } from "../inputs/ImagePicker/ImagePicker"

const schema = z.object({
    image:z.string(),
    /*
    name:z.string().min(1),
    description:z.string().min(1),
    price:z.coerce.number().min(1),
    store_category:z.string().min(1),
    */
    
    name:z.string(),
    description:z.string(),
    price:z.coerce.number(),
    store_category:z.string(),
    
    temperature:z.array(z.number()),
})

export type ProductFormFields = z.infer<typeof schema>

interface ProductFormProps{
    store_categorys:Array<StoreCategoriesModel>,
    onSubmitForm:(productInfo:ProductFormFields)=>Promise<Record<string,string> | null>,
    children:React.ReactNode
}
export function ProductForm({store_categorys,children,onSubmitForm}:ProductFormProps){
    const {register,getValues,setValue,handleSubmit,formState:{errors},control,setError} = useForm<ProductFormFields>({
        resolver:zodResolver(schema)
    })
    const onSubmit:SubmitHandler<ProductFormFields> = async (productInfo)=>{
        console.log(productInfo)
        const errors = await onSubmitForm(productInfo)
        console.log(errors)
        if(errors){
            Object.entries(errors).forEach(([key,value])=>{
                setError(key,{type:"custom",message:value[0]})
            })
        }
    }
    console.log(errors)
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
                                className="w-full max-h-60"
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
                    
                    <div className="w-full grid grid-cols-4 gap-x-4">
                        <AnimationPlaceholderInput
                            labelName="PRICE"
                            type="text"
                            name="price"
                            register={register('price')}
                            defaultValue={getValues('price') ? getValues('price').toString() : ""}
                            error={errors.price}
                        />
                        <div className="w-full h-full col-span-3 mt-0.5">
                            <FixedSizeDropdown
                                labelName="CATEGORY"
                                name="store_category"
                                register={register('store_category')}
                                defaultValue={getValues('store_category')}
                                error={errors.store_category}
                                list={store_categorys}
                                showFunction={(item,index)=>{
                                    // showing the store category label
                                    return store_categorys[index].name                           
                                }}  
                                filterFunction={(e)=>{
                                    const value = e.target.value
                                    const regex = new RegExp(value, "i");
                                    if (value.trim() === "") return store_categorys;
                                    return store_categorys.filter((item) => `${item.image}`.match(regex));
                                }}
                                onItemClick={(item)=>{
                                    setValue('store_category',(item as StoreCategoriesModel).name)
                                }}
                            />
                        </div>
                    </div>

                    <Controller
                        name="temperature"
                        control={control}
                        defaultValue={[-20,40]}
                        render={({field})=>{
                            return (
                                <Slider
                                    
                                    {...field}
                                    onChange={(e,value)=>{
                                        if(Array.isArray(value) && !( isNaN(value[1]) && isNaN(value[0] ))){ 
                                            if(value[1] - value[0] > MINIMUM_TEMPERATURE_RANGE){
                                                field.onChange(e,value)
                                            }
                                        }
                                    }}
                                    aria-label="TEMPERATURE "
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={(value)=>`${value}°C`}
                                    getAriaValueText={(value)=>`${value}°C`}
                                    disableSwap
                                    step={0.01}
                                    min={-20}
                                    max={40}
                                    sx={{
                                        "& .MuiSlider-rail":{
                                            color:"#38bdf8",
                                            opacity:0.5
                                        },
                                        "& .MuiSlider-track":{
                                            color:"#38bdf8"
                                        },
                                        "& .MuiSlider-thumb":{
                                            color:"#38bdf8"
                                        }
                                    }}
                                />
                            )
                        }}
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