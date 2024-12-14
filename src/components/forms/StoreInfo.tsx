
//todo: in future make this look better. Make this code better
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm, useFormContext } from "react-hook-form"
import { z } from 'zod'
import { StepperButtons } from "../stepper/StepperButtons"
import { useContext, useEffect, useRef, useState } from "react"
import { StepperContext } from "../stepper/StepperContext"
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { AnimationPlaceholderTextArea } from "../inputs/AnimationPlaceholderTextArea"
import { FixedSizeDropdown } from "../inputs/Dropdown/FixedSizeDropdown"
import { TagCard } from "../cards/TagCard"
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { CategoryModel } from "../../models/category"
/*
const schema = z.object({
    title:z.string().min(1).max(255),
    categories:z.array(z.coerce.number()).min(1),
    description:z.string().min(1)
})

export type StoreInfoFields = z.infer<typeof schema>

//const originalList = ['PIZZA','CATEGORY','SUSHI']
export function StoreInfo({indexStepper}:{indexStepper:number}){
    const storeCategories = useSelector((state:RootState)=>state.categoryReducer.categories)
    const formRef = useRef<HTMLFormElement | null>(null)
    const {stepper:{state,setState,singleLine},record:{record,setRecord},error:{errorStepper},beforeChangeMediaQuery:{setBeforeChangeMediaQuery},finish:{finish}} = useContext(StepperContext)
    const stepperIndex = singleLine ? indexStepper : state;
    const {handleSubmit,register,formState:{errors},getValues,setValue} = useForm<StoreInfoFields>({
        defaultValues:record[stepperIndex] ,
        resolver: zodResolver(schema),
        errors:errorStepper
    })
    const [categories,setCategories] = useState<{tags:Array<CategoryModel>,list:Array<CategoryModel>}>({
        'tags':getValues('categories') ? storeCategories?.filter((cat)=> getValues('categories').includes(cat.id)) : [] ,
        'list':storeCategories!.filter(category=>!getValues('categories') || !getValues('categories').includes(category.id)) as Array<CategoryModel>,
    })

    const onSubmit:SubmitHandler<StoreInfoFields> = (storeInfo)=>{
        setState(stepperIndex+1)
        const newRecord = record
        newRecord[stepperIndex] = storeInfo
        setRecord(newRecord)

    }

    
    const onPreviousClick = ()=>{
        if(stepperIndex > 0){
            const newRecord = record
            newRecord[stepperIndex] = getValues()
            setRecord(newRecord)
            setState(stepperIndex-1)
        }
    }

    useEffect(()=>{
        setValue('categories',categories.tags.map((cat)=>cat.id.toString()))
    },[categories])

    useEffect(()=>{
        console.log(getValues() )
        if(formRef && formRef.current && singleLine && finish){
            console.log("FINISHING")
            formRef.current.requestSubmit()
        }
    },[finish])

    useEffect(()=>setBeforeChangeMediaQuery(()=>(isMatched)=>{
        if(isMatched){
            const newRecord = record
            newRecord[stepperIndex] = getValues()
            setRecord(newRecord)
        }
      }),[])


    return (
        <form 
            ref={formRef}
            className="w-full"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-10  gap-x-4  pb-8" >
              
                    <AnimationPlaceholderInput
                        labelName="TITLE"
                        name="title"
                        type="text"
                        register={register('title')}
                        error={errors.title}
                        defaultValue={getValues('title')}
                    /> 
                    <div className="w-full flex flex-row justify-center items-center">
                        
                        <FixedSizeDropdown
                            closeOnClick={false}
                            labelName="CATEGORIES"
                            name="categories"
                            list={categories.list}
                            showFunction={(item)=>(item as CategoryModel).name.toUpperCase() as string}
                            filterFunction={(e)=>{
                                const value = e.target.value
                                const regex = new RegExp(value, "i");
                                console.log("FITLER FUNCTION")
                                console.log(getValues('categories'))
                                if (value.trim() === "" || !value) return categories.list;
                                return categories.list.filter((item) => item.name.match(regex));
                            }}
                            error={errors.categories}
                            onItemClick={(item)=>{
                                console.log(item)
                                const value = getValues('categories')
                                if(value) setValue('categories',[...getValues('categories'),(item as CategoryModel).id.toString()])
                                else setValue('categories',[(item as CategoryModel).id.toString()])
                                setCategories({
                                    list:storeCategories!.filter(category=>!getValues('categories').includes(category.id.toString())) as Array<CategoryModel>,
                                    tags:[...categories.tags,item as CategoryModel]})
                                console.log(storeCategories!.filter((category)=>!getValues('categories').includes(category)))
                                console.log(getValues())
                                
                            }}
                        /> 
                        
                    </div>
                <div className="w-full p-2 py-2  h-20 bg-slate-900 bg-opacity-50 backdrop-blur-lg  rounded-xl col-span-2 overflow-hidden flex flex-col gap-2.5">          
                    <span className="text-xs ">CATEGORY</span>
                    <div className="w-full h-full px-2 flex flex-row flex-wrap gap-2">
                        { categories.tags.map((category,index)=>
                            <TagCard
                            key={uuidv4()}
                            onDeleteClick={(e)=>{
                                setCategories({
                                    list:[...categories.list,category],
                                    tags:categories.tags.filter((_,_index)=>_index != index) as Array<CategoryModel>})
                            }}
                            >{category.name.toUpperCase()}</TagCard>
                        ) }
                    </div>
                </div>
                <div className="w-full md:col-span-2 col-span-1 max-h-max">
                    <AnimationPlaceholderTextArea
                        labelName="DESCRIPTION"
                        name="description"
                        register={register('description')}
                        error={errors.description}
                        defaultValue={getValues('description')}
                        className="max-h-24 scrollbar-hide"
                    />
                </div>
            
            </div>
            <StepperButtons
                onNextClick={()=>formRef.current?.requestSubmit()}
                onPreviousClick={()=>onPreviousClick()}
            />
        </form>
    )
}
    */

const schema = z.object({
    title:z.string().min(1).max(255),
    categories:z.array(z.coerce.number()).min(1),
    description:z.string().min(1)
})

export type StoreInfoFields = z.infer<typeof schema>

//const originalList = ['PIZZA','CATEGORY','SUSHI']
export function StoreInfo({indexStepper}:{indexStepper?:number}){
    const storeCategories = useSelector((state:RootState)=>state.categoryReducer.categories)
    //const {stepper:{state,setState,singleLine},record:{record,setRecord},error:{errorStepper},beforeChangeMediaQuery:{setBeforeChangeMediaQuery},finish:{finish}} = useContext(StepperContext)
    const control = useFormContext()
    const {register,formState:{errors},getValues,setValue} = control
    const [categories,setCategories] = useState<{tags:Array<CategoryModel>,list:Array<CategoryModel>}>({
        'tags':getValues('categories') ? storeCategories?.filter((cat)=> getValues('categories').includes(cat.id)) : [] ,
        'list':storeCategories!.filter(category=>!getValues('categories') || !getValues('categories').includes(category.id)) as Array<CategoryModel>,
    })



    useEffect(()=>{
        setValue('categories',categories.tags.map((cat)=>cat.id.toString()))
    },[categories])

 



    return (
    
            <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-10  gap-x-4  pb-8" >
              
                    <AnimationPlaceholderInput
                        labelName="TITLE"
                        name="title"
                        type="text"
                        register={register('title')}
                        error={errors.title}
                        defaultValue={getValues('title')}
                    /> 
                    <div className="w-full flex flex-row justify-center items-center">
                        
                        <FixedSizeDropdown
                            closeOnClick={false}
                            labelName="CATEGORIES"
                            name="categories"
                            list={categories.list}
                            showFunction={(item)=>(item as CategoryModel).name.toUpperCase() as string}
                            filterFunction={(e)=>{
                                const value = e.target.value
                                const regex = new RegExp(value, "i");
                                console.log("FITLER FUNCTION")
                                console.log(getValues('categories'))
                                if (value.trim() === "" || !value) return categories.list;
                                return categories.list.filter((item) => item.name.match(regex));
                            }}
                            error={errors.categories}
                            onItemClick={(item)=>{
                                console.log(item)
                                const value = getValues('categories')
                                if(value) setValue('categories',[...getValues('categories'),(item as CategoryModel).id.toString()])
                                else setValue('categories',[(item as CategoryModel).id.toString()])
                                setCategories({
                                    list:storeCategories!.filter(category=>!getValues('categories').includes(category.id.toString())) as Array<CategoryModel>,
                                    tags:[...categories.tags,item as CategoryModel]})
                                console.log(storeCategories!.filter((category)=>!getValues('categories').includes(category)))
                                console.log(getValues())
                                
                            }}
                        /> 
                        
                    </div>
                <div className="w-full p-2 py-2  h-20 bg-slate-900 bg-opacity-50 backdrop-blur-lg  rounded-xl col-span-2 overflow-hidden flex flex-col gap-2.5">          
                    <span className="text-xs ">CATEGORY</span>
                    <div className="w-full h-full px-2 flex flex-row flex-wrap gap-2">
                        { categories.tags.map((category,index)=>
                            <TagCard
                            key={uuidv4()}
                            onDeleteClick={(e)=>{
                                setCategories({
                                    list:[...categories.list,category],
                                    tags:categories.tags.filter((_,_index)=>_index != index) as Array<CategoryModel>})
                            }}
                            >{category.name.toUpperCase()}</TagCard>
                        ) }
                    </div>
                </div>
                <div className="w-full md:col-span-2 col-span-1 max-h-max">
                    <AnimationPlaceholderTextArea
                        labelName="DESCRIPTION"
                        name="description"
                        register={register('description')}
                        error={errors.description}
                        defaultValue={getValues('description')}
                        className="max-h-24 scrollbar-hide"
                    />
                </div>
            
            </div>
        
    )
}