import { Button  } from "react-bootstrap"
import { ProfileInfoFields } from "../ProfileInfo/ProfileInfoFields"
import { AuthInfoFields } from "../AuthInfo/AuthInfoFields"
import { profileInfoFieldsSchema } from "@features/autentication/models/ProfileInfoFields/ProfileInfoFieldsType"
import { authInfoFieldsSchema } from "@features/autentication/models/AuthInfoFields/AuthInfoFieldsType"
import { ZodObject, ZodRawShape } from "zod"
import { useMultiFormStepper } from "@hooks/MultiFormStepper/useMultiFormStepper"
import { cloneElement, isValidElement } from "react"

const totalSteps = 2

const getStepFormData = (step:number):{schema:ZodObject<ZodRawShape>,children:React.ReactNode}|null=>{
    switch(step){
        case 0:
            return {
                schema:profileInfoFieldsSchema,
                children:<ProfileInfoFields />
            }
        case 1:
            return {
                schema:authInfoFieldsSchema,
                children:<AuthInfoFields />
            }
        default:
            return null
    }
}

export function SigninFields(/*props:SigninFieldsProps*/){
    const className = "w-full flex flex-col items-center justify-center gap-2"
    const {canPrevious,canNext,previousStep,nextStep,children} = useMultiFormStepper({
        totalSteps,
        getStepFormData
    })

    const onPreviousClick = (/*event:React.MouseEvent*/)=>{
        previousStep()
    }

    const onNextClick = (/*event:React.MouseEvent*/)=>{
        nextStep()
    }
    
    return(
        <div>
            {
                isValidElement(children) ?
                cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,{className}) : null
            }
            <div className="w-full flex flex-row justify-between items-center pt-2">
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