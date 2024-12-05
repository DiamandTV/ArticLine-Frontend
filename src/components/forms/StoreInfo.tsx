import { zodResolver } from "@hookform/resolvers/zod"
import { set, SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'
import { StepperButtons } from "../stepper/StepperButtons"
import { useContext, useEffect, useRef, useState } from "react"
import { StepperContext } from "../stepper/StepperContext"
import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"
import { AnimationPlaceholderTextArea } from "../inputs/AnimationPlaceholderTextArea"
import { FixedSizeDropdown } from "../inputs/Dropdown/FixedSizeDropdown"
import { TagCard } from "../cards/TagCard"
import { v4 as uuidv4 } from 'uuid';
const schema = z.object({
    title:z.string().min(1).max(255),
    category:z.array(z.string()).min(1),
    description:z.string().min(1)
})

export type StoreInfoFields = z.infer<typeof schema>

const originalList = ['PIZZA','CATEGORY','SUSHI']
export function StoreInfo(){
    const formRef = useRef<HTMLFormElement | null>(null)
    const {stepper:{state,setState,maxStep},record:{record,setRecord},error:{errorStepper},beforeChangeMediaQuery:{setBeforeChangeMediaQuery}} = useContext(StepperContext)
    console.log(state)
    const {handleSubmit,register,formState:{errors},getValues,setValue} = useForm<StoreInfoFields>({
        defaultValues:record[state],
        resolver: zodResolver(schema),
        errors:errorStepper
    })

    const [categories,setCategories] = useState<{tags:Array<string>,list:Array<string>}>({
        'tags':getValues('category') || [] ,
        'list':originalList.filter(category=>!getValues('category') || !getValues('category').includes(category)) as Array<string>,
    })

    const onSubmit:SubmitHandler<StoreInfoFields> = (storeInfo)=>{
        setState(state+1)
        const newRecord = record
        newRecord[state] = storeInfo
        setRecord(newRecord)
    }

    
    const onPreviousClick = ()=>{
        if(state > 0){
            const newRecord = record
            newRecord[state] = getValues()
            setRecord(newRecord)
            setState(state-1)
        }
    }

    useEffect(()=>{
        setValue('category',categories.tags)
    },[categories])

    useEffect(()=>setBeforeChangeMediaQuery(()=>(isMatched)=>{
        if(isMatched){
            const newRecord = record
            newRecord[state] = getValues()
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
                        name="store_title"
                        type="text"
                        register={register('title')}
                        error={errors.title}
                        defaultValue={getValues('title')}
                    /> 
                    <div className="w-full flex flex-row justify-center items-center">
                        
                        <FixedSizeDropdown
                            closeOnClick={false}
                            labelName="CATEGORIES"
                            name="store_input_categories"
                            list={categories.list}
                            showFunction={(item)=>item as string}
                            filterFunction={(e)=>{
                                const value = e.target.value
                                const regex = new RegExp(value, "i");
                                console.log("FITLER FUNCTION")
                                console.log(getValues('category'))
                                if (value.trim() === "" || !value) return categories.list;
                                return categories.list.filter((item) => item.match(regex));
                            }}
                            error={errors.category}
                            onItemClick={(item)=>{
                                const value = getValues('category')
                                if(value) setValue('category',[...getValues('category'),item])
                                else setValue('category',[item])
                                setCategories({
                                    list:originalList.filter(category=>!getValues('category').includes(category)) as Array<string>,
                                    tags:getValues('category') as Array<string>})
                                console.log(originalList.filter((category)=>!getValues('category').includes(category)))
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
                                    tags:categories.tags.filter((_,_index)=>_index != index) as Array<string>})
                            }}
                            >{category}</TagCard>
                        ) }
                    </div>
                </div>
                <div className="w-full md:col-span-2 col-span-1 max-h-max">
                    <AnimationPlaceholderTextArea
                        labelName="DESCRIPTION"
                        name="store_description"
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