// import { zodResolver } from "@hookform/resolvers/zod"
// import { StepperContext } from "@mui/material"
// import { useContext, useEffect, useRef } from "react"
// import { SubmitHandler, useForm } from "react-hook-form"
// import { z } from 'zod'
// import { StepperButtons } from "../stepper/StepperButtons"
// import { ImagePicker } from "../inputs/ImagePicker/ImagePicker"
// import { AnimationPlaceholderInput } from "../inputs/AnimationPlaceholderInput"

// const schema = z.object({
//     image:z.string(),
//     name:z.string(),
//     description:z.string(),
// })

// type ProductDeatail = z.infer<typeof schema>
// export function ProductDetail(){
//     const {stepper:{state,setState},record:{record,setRecord},error:{errorStepper},beforeChangeMediaQuery:{setBeforeChangeMediaQuery}} = useContext(StepperContext)
//     const formRef = useRef<HTMLFormElement | null>(null)
//     const {handleSubmit,getValues} = useForm<ProductDeatail>({
//         resolver:zodResolver(schema)
//     })

//     useEffect(()=>{
//         setBeforeChangeMediaQuery(()=>(isMatched)=>{
//             if(isMatched){
//                  const newRecord = record
//                 newRecord[state] = getValues()
//                 setRecord(newRecord)
//             }
//         })
//     },[])

//     const onSubmit:SubmitHandler<ProductDeatail> = (storeInfo)=>{
//         setState(state+1)
//         const newRecord = record
//         newRecord[state] = storeInfo
//         setRecord(newRecord)
//     }
    
        
//     const onPreviousClick = ()=>{
//         if(state > 0){
//             const newRecord = record
//             newRecord[state] = getValues()
//             setRecord(newRecord)
//             setState(state-1)
//         }
//     }
    
//     return (
//         <form 
//             ref={formRef}
//             className="w-full"
//             onSubmit={handleSubmit(onSubmit)}>
//             <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-y-10  gap-x-4  pb-8" >
//                 <div className="w-full col-span-2">
//                     <ImagePicker/>
//                 </div>
//                 <AnimationPlaceholderInput/>
//             </div>
//             <StepperButtons
//                 onPreviousClick={()=>onPreviousClick()}
//                 onNextClick={()=>{
//                     if(formRef && formRef.current) formRef.current?.requestSubmit()
//                 }}
//             />
//         </form>
//     )
// }