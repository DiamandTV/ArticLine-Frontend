// import { Dialog } from "@mui/material";
// import { StepperForm, StepperGetStepDataProps } from "../stepper/Stepper";
// import { StoreImageForm } from "./StoreImageForm";
// export function ProductForm(){
//     const getStepData = (state:number):StepperGetStepDataProps=>{
//         switch (state){
//             case 0:
//                 return {
//                     component:<StoreImageForm/>,
//                     formsKeys:['images']
//                 }
//             case 1:
//                 return {
//                     formsKeys:[],
//                     component:(<div></div>)
//                 }
//             case 2:
//                 return {
//                     formsKeys:[],
//                     component:(<div></div>)
//                 }
//             default:
//                 return {
//                     formsKeys:[],
//                     component:(<div></div>)
//                 }
//                 break;
//         }

//     }
//     return (

//             <StepperForm 
//                 maxStep={2}
//                 stepLabels={["PRODUCTS","PRODUCTS DETAILS"]}
//                 getStepData={getStepData}
//                 onFinish={()=>{

//                 }}>

//             </StepperForm>
        
//     )
// }
import { zodResolver } from "@hookform/resolvers/zod"
import { StepperContext } from "@mui/material"
import { useContext, useEffect, useRef } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { AnimationPlaceholderTextArea } from "../inputs/AnimationPlaceholderTextArea"
import { FixedSizeDropdown } from "../inputs/Dropdown/FixedSizeDropdown"
import { store } from "../../store/store"
import { StoreCategoriesModel } from "../../models/StoreCategories"
import { StoreModel } from "../../models/store"

const schema = z.object({
    image:z.string(),
    name:z.string(),
    description:z.string(),
    price:z.number(),
    store_category:z.string(),
    temperature_start_range:z.number(),
    temperature_end_range:z.number()
})

type ProductFormFields = z.infer<typeof schema>

const store_categorys:Array<StoreCategoriesModel> = [
    {
        id:0,
        name:"PIZZA",
        image:"",
        description:"",
        store:1
    },
    {
        id:1,
        name:"SUSHI",
        image:"",
        description:"",
        store:1
    },
    {
        id:2,
        name:"ARANCIA",
        image:"",
        description:"",
        store:1
    }
]
export function ProductForm(){
    const {register,getValues,setValue,handleSubmit,formState:{errors}} = useForm<ProductFormFields>({
        resolver:zodResolver(schema)
    })
    const onSubmit:SubmitHandler<ProductFormFields> = async (productInfo)=>{

    }
    
    return(
        <form
        className="w-full"
        onSubmit={handleSubmit(onSubmit)}>   
            <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-10 gap-x-4 pb-8">
                <div>
                    
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
                    
                    <div className="w-full h-full grid grid-cols-4 gap-x-4">
                        <AnimationPlaceholderInput
                            labelName="PRICE"
                            type="text"
                            name="price"
                            register={register('price')}
                            defaultValue={getValues('price').toString()}
                            error={errors.price}
                        />
                        <div className="w-full h-full col-span-3">
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
                    <AnimationPlaceholderTextArea
                        labelName="DESCRIPTION"
                        name="description"
                        register={register('description')}
                        error={errors.description}
                        defaultValue={getValues('description')}
                    />
                </div>
            </div>
        </form>
    )
}