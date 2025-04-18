import { Button, Spinner  } from "react-bootstrap"
import { useMultiFormStepper } from "@hooks/MultiFormStepper/useMultiFormStepper"
import { cloneElement, isValidElement } from "react"
import { FieldsProps } from "@features/autentication/models/Fields/FieldsProps"
import { tailwindMerge } from "@lib/tsMerge/tsMerge"

export function SigninFields(props:FieldsProps){
    const className = tailwindMerge("w-full flex flex-col items-center justify-center gap-2 "+props.className)
    const {children} = useMultiFormStepper()
    return(
        <div className="flex flex-col gap-2">
            {
                isValidElement(children) ?
                cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,{...props,className}) : null
            }
            <SigninActions/>
        </div>
    )
}

function SigninActions(){
    const {mutationResult} = useMultiFormStepper()
    if(mutationResult.isLoading){
        return <SigninLoadingIndicator/>
    }
    return <SigninButtons/>
}   

function SigninLoadingIndicator(){
    return(
        <div className="w-full flex flex-row justify-center items-center gap-2">
            <Spinner animation="grow"/>
            <h3>FETCHING...</h3>
        </div>
    )
}


function SigninButtons(){
    const {canPrevious,canNext,previousStep,nextStep} = useMultiFormStepper()
    const onPreviousClick = async(/*event:React.MouseEvent*/)=>{
        await previousStep()
    }

    const onNextClick = async(/*event:React.MouseEvent*/)=>{
        await nextStep()
    }
    return(
        <div className="w-full flex flex-row justify-between items-center">
            <Button 
                size="lg"
                disabled={!canPrevious}
                onClick={onPreviousClick}>
                    PREVIOUS
            </Button>
            <Button size="lg"
            disabled={!canNext}
            onClick={onNextClick}>
                NEXT
            </Button>
        </div>
    )
}

// export function SigninFields(/*props:SigninFieldsProps*/){
//     const [step,setStep] = useState(0)
//     const className = "w-full flex flex-col items-center justify-center gap-2"
//     const {trigger} = useFormContext()
//     const getFormData = (step:number):{schema:ZodObject<ZodRawShape>,children:React.ReactNode}|null=>{
//         switch(step){
//             case 0:
//                 return {
//                     schema:profileInfoFieldsSchema,
//                     children:<ProfileInfoFields className={className}/>
//                 }
//             case 1:
//                 return {
//                     schema:authInfoFieldsSchema,
//                     children:<AuthInfoFields className={className}/>
//                 }
//             default:
//                 return null
//         }
//     }

//     const formDetail = getFormData(step)
//     const onPreviousClick = (event:React.MouseEvent)=>{
//         event.stopPropagation()       
//         setStep(step-1)
//     }
    
//     const onNextClick = async (event:React.MouseEvent) =>{
//         event.stopPropagation()
//         const isErrors = await trigger(formDetail?.schema.keyof().options,{shouldFocus:true})
//         if(isErrors){
//             setStep(step+1)
//         } 
//         //if(step == )
//     }

    
//     return(
//         <div>
//             {
//                 formDetail?.children
//             }
//             <div className="w-full flex flex-row justify-between items-center pt-2">
//                 <Button 
//                     size="lg"
//                     onClick={onPreviousClick}>
//                         PREVIOUS
//                 </Button>
//                 <Button size="lg"
//                 onClick={onNextClick}>
//                     NEXT
//                 </Button>
//             </div>
//         </div>
//     )
// }