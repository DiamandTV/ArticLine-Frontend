import {  useState } from "react"
import { StepperContext } from "./StepperContext"
import { Stepper, Step, StepLabel } from '@mui/material';
import StepContent from '@mui/material/StepContent';
//mport { useMediaQuery } from "react-responsive"
import { SxProps } from "@mui/material";
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { GoAlertFill } from "react-icons/go";
import { AxiosResponse } from "axios";
export interface StepperGetStepDataProps{
    formsKeys:Array<string>,
    component:React.ReactNode 
}

export interface StepperProps{
    maxStep:number ,
    stepLabels : Array<string|null>,
    getStepData: (state:number)=>StepperGetStepDataProps,
    onFinish:(record:Array<Record<string,unknown >>)=>Promise<AxiosResponse> | Record<string,string>
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

export function StepperForm({maxStep,getStepData,stepLabels,onFinish}:StepperProps){
    const [state,setState] = useState(0)
    const [record,setRecord] = useState<Array<Record<string,unknown>>>([])
    const [errorStepper,setErrorStepper] = useState<Record<string,unknown>>({})
    const [beforeChangeMediaQuery,setBeforeChangeMediaQuery] = useState<(isMatched:boolean)=>void>(()=>()=>{})
    //const sm = useMediaQuery("(max-width: 640px)")
    //const md = useMediaQuery({query:'(max-width: 768px)'},undefined,onChangeMediaQuery)
    const md = useMediaQuery({query:'(max-width: 768px)',beforeChange:beforeChangeMediaQuery})
    const {component} = getStepData(state)

    const showError = (index:number)=>{
        const {formsKeys} = getStepData(index)
        const errorStepperKeys = Object.keys(errorStepper)
        for(let i=0;i<formsKeys.length;i++){
            if(errorStepperKeys.includes(formsKeys[i])){
                return true
            }
        }
        return false
    }

    return(
        <StepperContext.Provider  
        value={{stepper:{state,setState,maxStep,stepLabels,onFinish},
            record:{record,setRecord},error:{errorStepper,setErrorStepper},
            beforeChangeMediaQuery:{beforeChangeMediaQuery,setBeforeChangeMediaQuery}
            }}>
            <div className="w-full">
                {md ? 
                <>
                    <Stepper activeStep={state} orientation="vertical">
                        {stepLabels.map((label,index)=>(
                            label &&
                            <Step key={index} sx={getStepperStyle(index,state)} >
                                <StepLabel  
                                    icon={showError(index) ? <GoAlertFill size={27.5} color="orangeRed"/> : null}
                                    >
                                        {label}
                                </StepLabel>
                                <StepContent className="pt-6">
                                    {component}
                                </StepContent>
                                
                            </Step> 
                        ))}
                    </Stepper>
                   {!stepLabels[state] && component}
                </> 
                :
                <>
                    <Stepper activeStep={state}>
                        {stepLabels.map((label,index)=>{
                            return ( 
                                label && 
                                <Step key={index}  sx={getStepperStyle(index,state)}>
                                    <StepLabel 
                                        icon={showError(index) ? <GoAlertFill size={27.5} color="orangeRed"/> : null}
                                    >{label}</StepLabel>
                                </Step> 
                            )
                        })}
                    </Stepper>
                    <div className="pt-10">
                    {component}
                    </div>
                </>
                }
            </div>
        </StepperContext.Provider>
    ) 
}