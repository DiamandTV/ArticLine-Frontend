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
    onFinish:(record:Array<Record<string,unknown >>)=>Promise<AxiosResponse> | Record<string,string>,
    singleLine?:boolean,
    defaultValue?:Array<Record<string,unknown>>|null
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

export function StepperForm({maxStep,getStepData,stepLabels,onFinish,singleLine=false,defaultValue}:StepperProps){
    const [state,setState] = useState(0)
    const [record,setRecord] = useState<Array<Record<string,unknown>>>(defaultValue ? defaultValue : [])
    const [errorStepper,setErrorStepper] = useState<Record<string,unknown>>({})
    const [finish,setFinish] = useState(false)
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
        value={{stepper:{state,setState, getStepData,maxStep,stepLabels,onFinish,singleLine},
            record:{record,setRecord},error:{errorStepper,setErrorStepper},
            beforeChangeMediaQuery:{beforeChangeMediaQuery,setBeforeChangeMediaQuery},
            finish:{finish,setFinish}
            }}>
            <div className="w-full">
                {md ? 
                <>
                    <Stepper activeStep={state} orientation="vertical">
                        {stepLabels.map((label,index)=>{
                            const isShowError = showError(index)
                            if(label)
                                return (
                                    <Step key={index} sx={getStepperStyle(index,state)} >
                                        <StepLabel  
                                            icon={isShowError ? <GoAlertFill size={27.5} color="orangeRed" opacity={state == index ? 1 : 0.5}/> : null}
                                            >
                                                {label}
                                        </StepLabel>
                                        <StepContent className="pt-6">
                                            {component}
                                        </StepContent>   
                                    </Step> 
                                )
    })}
                    </Stepper>
                   {!stepLabels[state] && component}
                </> 
                :
                <>
                {!singleLine ?
                    <Stepper activeStep={state}>
                        {stepLabels.map((label,index)=>{
                            const isShowError = showError(index)
                            return ( 
                                label && 
                                <Step key={index}  sx={getStepperStyle(index,state)}>
                                    <StepLabel 
                                        icon={isShowError ? <GoAlertFill size={27.5} color="orangeRed" opacity={state == index ? 1 : 0.5}/> : null}
                                    >{label}</StepLabel>
                                </Step> 
                            )
                        })}
                    </Stepper> : null}
                    <div className={!singleLine ? "pt-10" : ""}>
                        {!singleLine ? component :
                            Array.from({length:maxStep},(_,index)=>{
                                return getStepData(index).component;
                            })
                        }
                    </div>
                </>
                }
                
            </div>
        </StepperContext.Provider>
    ) 
}