import {  useState } from "react"
import { StepperContext } from "./StepperContext"
import { Stepper, Step, StepLabel } from '@mui/material';
import StepContent from '@mui/material/StepContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SxProps } from "@mui/material";
interface StepperProps{
    maxStep:number ,
    stepLabels : Array<string>,
    getStep: (state:number)=>React.ReactNode,
    onFinish:(record:Array<Record<string,unknown>>)=>Promise<Record<string,string>> | Record<string,string>
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getStepperStyle(index:number,state:number):SxProps{

    return  {

        "& .Mui-active":{
            "&.MuiStepIcon-root":{
                color:"rgb(14 165 233)",
            },
            "&.MuiStepLabel-label":{
                color:"white"
            }
        },
        "& .Mui-completed":{
            "&.MuiStepIcon-root":{
                color:"rgb(14 165 233)"
            },
            //{ Questo si applica al componente attivo }
            "&.MuiStepLabel-label":{
                color: "white"
            }
        },        
        //{  Questo cerca un figlio con la classe Mui-active },
        "& .MuiStepLabel-label":{
            color:"rgb(163 163 163)",
        }
    } 
}

export function StepperForm({maxStep,getStep,stepLabels,onFinish}:StepperProps){
    const [state,setState] = useState(0)
    const [record,setRecord] = useState<Array<Record<string,unknown>>>([])
    const [errorStepper,setErrorStepper] = useState<Record<string,unknown>>({})
    //const sm = useMediaQuery("(max-width: 640px)")
    const md = useMediaQuery("(max-width: 768px)")
    return(
        <StepperContext.Provider  value={{stepper:{state,setState,maxStep,stepLabels,onFinish},record:{record,setRecord},error:{errorStepper,setErrorStepper}}}>
            <div className="w-full">
                {md ? 
                <Stepper activeStep={state} orientation="vertical">
                    {stepLabels.map((label,index)=>(
                        <Step key={index} sx={getStepperStyle(index,state)} >
                            <StepLabel sx={{}}>{label}</StepLabel>
                            <StepContent className="pt-6">
                                {getStep(index)}
                            </StepContent>
                            
                        </Step>
                    ))}
                </Stepper> 
                :
                <>
                    <Stepper activeStep={state}>
                        {stepLabels.map((label,index)=>(
                            <Step key={index}  sx={getStepperStyle(index,state)}>
                                <StepLabel >{label}</StepLabel>
                            </Step>
                        ))}
                        
                    </Stepper>
                    <div className="pt-10">
                        {getStep(state)}
                    </div>
                </>
                }
            </div>
        </StepperContext.Provider>
    ) 
}